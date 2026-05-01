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

  if (!visible) return null;

  return (
    <div className="ws-cookie-wrap">
      <div className="ws-cookie">
        <div className="ws-cookie-text">
          <p className="ws-cookie-title">{copy.title}</p>
          <p className="ws-cookie-body">{copy.text}</p>
          <Link href={`/${locale}/cookie-policy/`} className="ws-cookie-link">
            {copy.learnMore}
          </Link>
        </div>

        <div className="ws-cookie-actions">
          <button
            type="button"
            onClick={() => saveChoice("necessary")}
            className="ws-button ws-button-ghost"
          >
            {copy.necessaryOnly}
          </button>
          <button
            type="button"
            onClick={() => saveChoice("accepted")}
            className="ws-button ws-button-primary"
          >
            {copy.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
