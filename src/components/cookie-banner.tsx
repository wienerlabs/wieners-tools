"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { legalContent } from "@/lib/legal";

const STORAGE_KEY = "wieners_tools_cookie_choice_v1";

export function CookieBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const copy = legalContent[locale].banner;

  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function saveChoice(value: "accepted" | "necessary") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-[24px] border border-white/10 bg-[var(--ink)] p-5 text-[#eee9e4] shadow-[0_-8px_30px_rgba(0,0,0,0.22)] md:flex-row md:items-end md:justify-between md:gap-6 md:p-6">
        <div className="max-w-3xl">
          <p className="font-[var(--font-host)] text-2xl font-bold leading-none">{copy.title}</p>
          <p className="mt-3 text-sm leading-6 text-white/72 md:text-[15px]">{copy.text}</p>
          <Link
            href={`/${locale}/cookie-policy/`}
            className="mt-3 inline-flex text-sm font-bold text-[var(--gold)] hover:opacity-75"
          >
            {copy.learnMore}
          </Link>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <button
            type="button"
            onClick={() => saveChoice("necessary")}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 px-5 py-3 text-center text-sm leading-none font-bold whitespace-nowrap text-[#eee9e4] sm:min-w-[138px] transition-opacity hover:opacity-80"
          >
            {copy.necessaryOnly}
          </button>
          <button
            type="button"
            onClick={() => saveChoice("accepted")}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--red)] px-5 py-3 text-center text-sm leading-none font-bold whitespace-nowrap text-white sm:min-w-[138px] transition-opacity hover:opacity-80"
          >
            {copy.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
