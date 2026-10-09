"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { NavGroup, NavLink } from "@/lib/nav";

type LanguageOption = { code: string; label: string; name: string };

type SiteNavProps = {
  homeHref: string;
  brand: string;
  primary: NavLink[];
  groups: NavGroup[];
  menuLabel: string;
  closeLabel: string;
  language: LanguageOption;
  languages: LanguageOption[];
};

function isCurrent(pathname: string, href: string, homeHref: string) {
  if (href === homeHref) return pathname === homeHref || pathname.startsWith(`${homeHref}tools/`);
  return pathname.startsWith(href);
}

function MenuLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  if (link.href.includes("#")) {
    return (
      <a href={link.href} onClick={onNavigate}>
        <span>{link.label}</span>
      </a>
    );
  }
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" onClick={onNavigate}>
        <span>{link.label}</span>
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link href={link.href} onClick={onNavigate}>
      <span>{link.label}</span>
    </Link>
  );
}

export function SiteNav({ homeHref, brand, primary, groups, menuLabel, closeLabel, language, languages }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() ?? homeHref;
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header ref={rootRef} className="ws-nav" data-open={open ? "true" : "false"}>
      <div className="ws-nav-bar">
        <Link href={homeHref} className="ws-nav-brand" aria-label={brand} onClick={close}>
          <BrandMark className="ws-nav-mark" />
          <span>{brand}</span>
        </Link>

        <nav className="ws-nav-links" aria-label={brand}>
          {primary.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="ws-nav-link"
              aria-current={isCurrent(pathname, link.href, homeHref) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="ws-nav-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          <span className="ws-nav-toggle-icon" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>{open ? closeLabel : menuLabel}</span>
        </button>

        <LanguageSwitcher current={language} options={languages} />
      </div>

      <div id="site-menu" className="ws-nav-panel" hidden={!open}>
        {groups.map((group) => (
          <section key={group.title} className="ws-nav-group">
            <p className="ws-nav-group-title">{group.title}</p>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <MenuLink link={link} onNavigate={close} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </header>
  );
}
