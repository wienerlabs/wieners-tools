"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

type LanguageOption = {
  code: string;
  label: string;
  name: string;
};

export function LanguageSwitcher({ current, options }: { current: LanguageOption; options: LanguageOption[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hrefFor = (code: string) => pathname.replace(/^\/(tr|de|en|ar)(?=\/|$)/, `/${code}`);

  return (
    <div ref={rootRef} className="ws-lang">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="ws-lang-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={current.name}
      >
        <Globe size={15} strokeWidth={1.6} aria-hidden="true" />
        <span>{current.label}</span>
      </button>

      {open ? (
        <ul className="ws-lang-menu">
          {options.map((option) => (
            <li key={option.code}>
              <a href={hrefFor(option.code)} hrefLang={option.code} lang={option.code} className="ws-lang-option">
                {option.name}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
