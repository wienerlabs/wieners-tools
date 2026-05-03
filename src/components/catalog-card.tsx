"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Copy } from "lucide-react";
import type { CatalogResource } from "@/lib/catalogs";

type Labels = {
  copy: string;
  copied: string;
  install: string;
  config: string;
  open: string;
};

type Props = {
  resource: CatalogResource;
  labels: Labels;
  defaultOpen?: boolean;
};

export function CatalogCard({ resource, labels, defaultOpen = false }: Props) {
  const hasContent = !!(resource.install || resource.snippet || resource.content);
  const [open, setOpen] = useState(defaultOpen && hasContent);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard?.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1300);
    } catch {
      /* noop */
    }
  };

  const Body = (
    <>
      <header className="ws-cat-card-head">
        <div className="ws-cat-card-titlewrap">
          <h3 className="ws-cat-card-name">
            {resource.name}
            {resource.badge ? <span className="ws-cat-card-badge">{resource.badge}</span> : null}
          </h3>
          <p className="ws-cat-card-blurb">{resource.blurb}</p>
        </div>
        <div className="ws-cat-card-actions">
          {resource.url && resource.url !== "#" ? (
            <a className="ws-bc-pill" href={resource.url} target="_blank" rel="noreferrer">
              {labels.open}
              <ArrowUpRight size={12} />
            </a>
          ) : null}
          {hasContent ? (
            <button
              type="button"
              className={`ws-cat-card-toggle ${open ? "is-open" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              <ChevronDown size={14} />
            </button>
          ) : null}
        </div>
      </header>

      {open && hasContent ? (
        <div className="ws-cat-card-body">
          {resource.install ? (
            <div className="ws-cat-block">
              <header className="ws-cat-block-head">
                <span>{labels.install}</span>
                <button type="button" className="ws-cat-copy" onClick={() => copy("install", resource.install!)}>
                  {copiedId === "install" ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </header>
              <pre className="ws-cat-code"><code>{resource.install}</code></pre>
            </div>
          ) : null}

          {resource.snippet ? (
            <div className="ws-cat-block">
              <header className="ws-cat-block-head">
                <span>example</span>
                <button type="button" className="ws-cat-copy" onClick={() => copy("snippet", resource.snippet!)}>
                  {copiedId === "snippet" ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </header>
              <pre className="ws-cat-code"><code>{resource.snippet}</code></pre>
            </div>
          ) : null}

          {resource.content ? (
            <div className="ws-cat-block ws-cat-block-content">
              <header className="ws-cat-block-head">
                <span>{resource.contentLanguage === "json" ? labels.config : "content"}</span>
                <button
                  type="button"
                  className="ws-cat-copy-cta"
                  onClick={() => copy("content", resource.content!)}
                >
                  {copiedId === "content" ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedId === "content" ? labels.copied : labels.copy}</span>
                </button>
              </header>
              <pre className="ws-cat-code ws-cat-code-content"><code>{resource.content}</code></pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );

  return <article className={`ws-cat-card ${open ? "is-open" : ""}`}>{Body}</article>;
}
