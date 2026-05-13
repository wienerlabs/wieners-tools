"use client";

import { Download, Github, ArrowUpRight, Apple, ShieldCheck, Cpu, Server, Wifi } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";

type Props = {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
};

const RELEASES_LATEST = "https://github.com/wienerlabs/wiener-dl-mac/releases/latest";
const RELEASES_DMG_PATTERN =
  "https://github.com/wienerlabs/wiener-dl-mac/releases/latest/download/Wiener.DL_aarch64.dmg";
const SOURCE_REPO = "https://github.com/wienerlabs/wiener-dl-mac";

export default function VideoDownloaderTool({ i18n }: Props) {
  const o = (i18n.options ?? {}) as Record<string, string>;
  const t = (k: string, fallback = ""): string => o[k] ?? fallback;

  return (
    <div className="ws-vdl">
      <p className="ws-vdl-tagline">{t("tagline", "")}</p>

      <section className="ws-vdl-cta">
        <a className="ws-vdl-primary" href={RELEASES_LATEST} target="_blank" rel="noreferrer">
          <Download size={16} />
          <span>{t("cta", "Download Wiener DL.app")}</span>
        </a>
        <a className="ws-vdl-secondary" href={SOURCE_REPO} target="_blank" rel="noreferrer">
          <Github size={14} />
          <span>{t("ctaSecondary", "Source on GitHub")}</span>
          <ArrowUpRight size={12} />
        </a>
        <p className="ws-vdl-size">{t("sizeHint", "~135 MB · Apple Silicon and Intel · macOS 11+")}</p>
      </section>

      <section className="ws-vdl-section">
        <h3 className="ws-vdl-heading">{t("installTitle", "Install")}</h3>
        <ol className="ws-vdl-steps">
          <li>
            <a href={RELEASES_DMG_PATTERN} target="_blank" rel="noreferrer">
              {t("step1", "Download the .dmg")} <ArrowUpRight size={12} />
            </a>
          </li>
          <li>{t("step2", "Open it, drag Wiener DL.app into Applications")}</li>
          <li>{t("step3", "First launch: right-click → Open → Open")}</li>
          <li>{t("step4", "Paste a URL, hit Download.")}</li>
        </ol>
      </section>

      <section className="ws-vdl-section">
        <h3 className="ws-vdl-heading">{t("whatsInside", "What's inside")}</h3>
        <ul className="ws-vdl-bundle">
          <li>
            <Cpu size={14} />
            <span>{t("bundleYtdlp", "yt-dlp (1800+ sites supported)")}</span>
          </li>
          <li>
            <Cpu size={14} />
            <span>{t("bundleFfmpeg", "ffmpeg + ffprobe (codec conversion)")}</span>
          </li>
          <li>
            <Apple size={14} />
            <span>{t("bundleNative", "Tauri + Rust (~5 MB native binary)")}</span>
          </li>
          <li>
            <Server size={14} />
            <span>{t("bundleNoServer", "Zero servers, zero telemetry")}</span>
          </li>
        </ul>
      </section>

      <section className="ws-vdl-section ws-vdl-aside">
        <h3 className="ws-vdl-heading-small">{t("whyNotBrowser", "Why not in the browser?")}</h3>
        <p>{t("whyNotBrowserBody", "")}</p>
      </section>

      <section className="ws-vdl-section ws-vdl-aside">
        <h3 className="ws-vdl-heading-small">
          <ShieldCheck size={13} /> {t("privacyTitle", "Privacy")}
        </h3>
        <p>{t("privacyBody", "")}</p>
      </section>

      <section className="ws-vdl-section ws-vdl-aside">
        <h3 className="ws-vdl-heading-small">
          <Wifi size={13} /> {t("licenseTitle", "License")}
        </h3>
        <p>{t("licenseBody", "")}</p>
      </section>
    </div>
  );
}
