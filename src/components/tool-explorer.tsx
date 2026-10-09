"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Search } from "lucide-react";
import { normalizeSearch } from "@/lib/search";

type ExplorerCategory = { id: string; name: string; count: number };
type ExplorerTool = { slug: string; category: string; text: string };

type ToolExplorerProps = {
  categories: ExplorerCategory[];
  tools: ExplorerTool[];
  labels: { search: string; all: string; empty: string };
  children: React.ReactNode;
};

const CATEGORY_EVENT = "ws:category";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener(CATEGORY_EVENT, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener(CATEGORY_EVENT, callback);
  };
}

function readHash() {
  return decodeURIComponent(window.location.hash.slice(1));
}

export function ToolExplorer({ categories, tools, labels, children }: ToolExplorerProps) {
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  const active = categories.some((category) => category.id === hash) ? hash : "all";

  const visible = useMemo(() => {
    const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
    return new Set(
      tools
        .filter((tool) => active === "all" || tool.category === active)
        .filter((tool) => terms.every((term) => tool.text.includes(term)))
        .map((tool) => tool.slug)
    );
  }, [tools, query, active]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.querySelectorAll<HTMLElement>("[data-slug]").forEach((item) => {
      item.hidden = !visible.has(item.dataset.slug ?? "");
    });
    list.querySelectorAll<HTMLElement>("[data-category]").forEach((section) => {
      section.hidden = !section.querySelector("[data-slug]:not([hidden])");
    });
  }, [visible]);

  useEffect(() => {
    const reveal = () => {
      if (categories.some((category) => category.id === readHash())) rootRef.current?.scrollIntoView({ block: "start" });
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [categories]);

  const choose = (id: string) => {
    const url = id === "all" ? window.location.pathname + window.location.search : `#${id}`;
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(CATEGORY_EVENT));
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) rootRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <div ref={rootRef} id="tools" className="ws-explorer">
      <div className="ws-explorer-bar">
        <label className="ws-search">
          <Search size={18} strokeWidth={1.6} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.search}
            aria-label={labels.search}
            autoComplete="off"
            spellCheck={false}
          />
          <span className="ws-search-count" aria-live="polite">
            {visible.size}/{tools.length}
          </span>
        </label>

        <div className="ws-chips">
          <button type="button" className="ws-chip-filter" aria-pressed={active === "all"} onClick={() => choose("all")}>
            {labels.all}
            <span>{tools.length}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="ws-chip-filter"
              aria-pressed={active === category.id}
              onClick={() => choose(category.id)}
            >
              {category.name}
              <span>{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div ref={listRef} className="ws-explorer-list">
        {children}
      </div>

      {visible.size === 0 ? <p className="ws-explorer-empty">{labels.empty}</p> : null}
    </div>
  );
}
