"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type CardNavItem = {
  label: string;
  bgColor?: string;
  textColor?: string;
  links: CardNavLink[];
};

type CardNavProps = {
  logo: string;
  logoAlt?: string;
  logoHref?: string;
  items: CardNavItem[];
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  menuLabel?: string;
  closeLabel?: string;
  rightSlot?: React.ReactNode;
};

export default function CardNav({
  logo,
  logoAlt = "Logo",
  logoHref = "/",
  items,
  baseColor = "#fff4dd",
  menuColor = "#000000",
  buttonBgColor = "#000000",
  buttonTextColor = "#fff4dd",
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  menuLabel = "Menu",
  closeLabel = "Close",
  rightSlot
}: CardNavProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  // close on ESC and outside click
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onClick);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header
      ref={rootRef}
      className={`ws-cardnav ${open ? "is-open" : ""}`}
      style={
        {
          ["--cn-base" as string]: baseColor,
          ["--cn-menu" as string]: menuColor,
          ["--cn-cta-bg" as string]: buttonBgColor,
          ["--cn-cta-text" as string]: buttonTextColor
        } as React.CSSProperties
      }
      data-state={open ? "open" : "closed"}
    >
      <div className="ws-cardnav-bar">
        <Link href={logoHref} className="ws-cardnav-brand" aria-label={logoAlt}>
          <img src={logo} alt="" width={32} height={32} />
        </Link>

        <div className="ws-cardnav-actions">
          {rightSlot}

          {secondaryCtaLabel && secondaryCtaHref ? (
            <Link href={secondaryCtaHref} className="ws-cardnav-cta is-secondary">
              <span>{secondaryCtaLabel}</span>
              <ArrowUpRight size={14} />
            </Link>
          ) : null}

          {ctaLabel && ctaHref ? (
            <Link href={ctaHref} className="ws-cardnav-cta">
              <span>{ctaLabel}</span>
              <ArrowUpRight size={14} />
            </Link>
          ) : null}

          <button
            type="button"
            className="ws-cardnav-toggle"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label={open ? closeLabel : menuLabel}
          >
            <span className="ws-cardnav-toggle-icon" aria-hidden="true">
              {open ? <X size={16} /> : <Menu size={16} />}
            </span>
            <span className="ws-cardnav-toggle-label">{open ? closeLabel : menuLabel}</span>
          </button>
        </div>
      </div>

      <div className="ws-cardnav-panel" aria-hidden={!open}>
        <div className="ws-cardnav-grid">
          {items.map((item, i) => (
            <article
              key={`${item.label}-${i}`}
              className="ws-cardnav-card"
              style={{
                background: item.bgColor ?? "var(--cn-cta-bg)",
                color: item.textColor ?? "var(--cn-cta-text)",
                transitionDelay: open ? `${i * 80}ms` : "0ms"
              }}
            >
              <h3 className="ws-cardnav-card-title">{item.label}</h3>
              <ul className="ws-cardnav-card-links">
                {item.links.map((link, j) => (
                  <li key={`${link.label}-${j}`}>
                    {link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        aria-label={link.ariaLabel ?? link.label}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        <ArrowUpRight size={16} aria-hidden="true" />
                        <span>{link.label}</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        aria-label={link.ariaLabel ?? link.label}
                        onClick={() => setOpen(false)}
                      >
                        <ArrowUpRight size={16} aria-hidden="true" />
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </header>
  );
}
