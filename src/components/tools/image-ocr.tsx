"use client";

import { useState } from "react";
import { Copy, Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Select } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

type Lang =
  | "eng"
  | "tur"
  | "deu"
  | "ara"
  | "fra"
  | "spa"
  | "ita"
  | "rus"
  | "jpn";

export default function ImageOcrTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const defaultLang: Lang =
    locale === "tr" ? "tur" : locale === "de" ? "deu" : locale === "ar" ? "ara" : "eng";
  const [lang, setLang] = useState<Lang>(defaultLang);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<string>("");

  const modelHint =
    locale === "tr"
      ? "Seçtiğiniz dile göre 5–25 MB tessdata indirilir, sonra cache'lenir."
      : locale === "de"
        ? "Je nach Sprache werden 5–25 MB tessdata geladen und gecached."
        : locale === "ar"
          ? "تنزل 5–25 ميغابايت من tessdata حسب اللغة، ثم تُخزَّن."
          : "5–25 MB of tessdata is downloaded for your language, then cached.";

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setText("");
    setProgress(0);
    setPhase("");

    const tesseract = await import("tesseract.js");
    const result = await tesseract.recognize(files[0], lang, {
      logger: (m: { status: string; progress: number }) => {
        setPhase(m.status);
        if (m.progress) setProgress(Math.round(m.progress * 100));
      }
    });
    setText(result.data.text);
    setBusy(false);
    setPhase("");
  };

  const copy = () => {
    if (text) navigator.clipboard?.writeText(text);
  };

  const downloadTxt = () => {
    if (!text) return;
    downloadBlob(new Blob([text], { type: "text/plain" }), "ocr.txt");
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <p className="ws-tool-privacy" style={{ background: "rgba(200, 162, 71, 0.1)", color: "var(--copper)" }}>
        {modelHint}
      </p>

      <OptionsPanel>
        <FieldRow label="Language">
          <Select<Lang>
            value={lang}
            options={[
              { value: "eng", label: "English" },
              { value: "tur", label: "Türkçe" },
              { value: "deu", label: "Deutsch" },
              { value: "ara", label: "العربية" },
              { value: "fra", label: "Français" },
              { value: "spa", label: "Español" },
              { value: "ita", label: "Italiano" },
              { value: "rus", label: "Русский" },
              { value: "jpn", label: "日本語" }
            ]}
            onChange={setLang}
          />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? `${ui.processing} ${phase} ${progress}%` : ui.process}
        </button>
        {text ? (
          <>
            <button type="button" className="ws-button ws-button-ghost" onClick={copy}>
              <Copy size={14} /> Copy
            </button>
            <button type="button" className="ws-button ws-button-ghost" onClick={downloadTxt}>
              .txt
            </button>
          </>
        ) : null}
      </div>

      {text ? (
        <pre className="ws-ascii-output" style={{ fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
          {text}
        </pre>
      ) : null}
    </>
  );
}
