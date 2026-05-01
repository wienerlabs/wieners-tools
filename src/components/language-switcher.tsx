"use client";

import { useEffect, useRef, useState } from "react";

type LanguageOption = {
  href: string;
  label: string;
};

export function LanguageSwitcher({
  currentLabel,
  options
}: {
  currentLabel: string;
  options: LanguageOption[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div ref={rootRef} className="ws-lang">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="ws-lang-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>{currentLabel}</span>
        <span aria-hidden="true" className={`ws-lang-caret ${open ? "is-open" : ""}`}>
          ▾
        </span>
      </button>

      {open ? (
        <div className="ws-lang-menu" role="menu">
          {options.map((option) => (
            <button
              key={option.href}
              type="button"
              role="menuitem"
              onClick={() => window.location.assign(option.href)}
              className="ws-lang-option"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
