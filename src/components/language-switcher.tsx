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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (!open) return;
    const isOutside = (target: EventTarget | null) => !rootRef.current?.contains(target as Node);
    const onPointer = (event: PointerEvent) => {
      if (isOutside(event.target)) setOpen(false);
    };
    const onFocus = (event: FocusEvent) => {
      if (isOutside(event.target)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hrefFor = (code: string) =>
    pathname.replace(/^\/(tr|de|en|ar)(?=\/|$)/, `/${code}`) + window.location.hash;

  return (
    <div ref={rootRef} className="ws-lang">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="ws-lang-trigger"
        aria-expanded={open}
        aria-controls="site-languages"
        aria-label={current.name}
      >
        <Globe size={15} strokeWidth={1.6} aria-hidden="true" />
        <span>{current.label}</span>
      </button>

      {open ? (
        <ul id="site-languages" className="ws-lang-menu">
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
