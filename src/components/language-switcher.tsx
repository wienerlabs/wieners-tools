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
  const triggerClassName =
    "home-nav-link inline-flex appearance-none items-center gap-1 !text-[13px] !font-medium !leading-none !text-[var(--red)] sm:!text-[13px]";
  const optionClassName =
    "home-nav-link block w-full py-2.5 text-left !text-[13px] !font-medium !leading-[1.35] text-black/68 transition-opacity hover:opacity-60";

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
    <div ref={rootRef} className="relative z-[120] ml-0 mr-0 shrink-0 translate-y-px sm:-ml-10 sm:mr-4">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={triggerClassName}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>{currentLabel}</span>
        <span aria-hidden="true" className={`text-[8px] transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+8px)] z-[130] grid min-w-[124px] gap-1.5 bg-white py-2 pointer-events-auto">
          {options.map((option) => (
            <button
              key={option.href}
              type="button"
              onClick={() => window.location.assign(option.href)}
              className={optionClassName}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
