"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download, Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Select, ColorInput, TextArea } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

type Level = "L" | "M" | "Q" | "H";

export default function QRGeneratorTool({
  locale,
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const [text, setText] = useState("https://wienerstools.com");
  const [size, setSize] = useState(512);
  const [level, setLevel] = useState<Level>("M");
  const [foreground, setForeground] = useState("#050505");
  const [background, setBackground] = useState("#ffffff");
  const [margin, setMargin] = useState(2);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const render = async () => {
    if (!text.trim()) {
      setDataUrl(null);
      return;
    }
    setBusy(true);
    try {
      const url = await QRCode.toDataURL(text, {
        errorCorrectionLevel: level,
        width: size,
        margin,
        color: { dark: foreground, light: background }
      });
      setDataUrl(url);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(render, 200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, size, level, foreground, background, margin]);

  const onDownload = async () => {
    if (!dataUrl) return;
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    downloadBlob(blob, "qr.png");
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.content ?? "Content"} hint="URL, text, vCard, mailto:, tel:">
          <TextArea value={text} onChange={setText} rows={3} placeholder="https://..." />
        </FieldRow>

        <FieldRow label={opt.size ?? "Size"}>
          <NumberInput value={size} min={64} max={2048} step={32} onChange={setSize} suffix="px" />
        </FieldRow>

        <FieldRow label={opt.level ?? "Error correction"}>
          <Select<Level>
            value={level}
            options={[
              { value: "L", label: "L (~7%)" },
              { value: "M", label: "M (~15%)" },
              { value: "Q", label: "Q (~25%)" },
              { value: "H", label: "H (~30%)" }
            ]}
            onChange={setLevel}
          />
        </FieldRow>

        <FieldRow label={opt.margin ?? "Margin"}>
          <NumberInput value={margin} min={0} max={16} step={1} onChange={setMargin} />
        </FieldRow>

        <FieldRow label={opt.foreground ?? "Foreground"}>
          <ColorInput value={foreground} onChange={setForeground} />
        </FieldRow>

        <FieldRow label={opt.background ?? "Background"}>
          <ColorInput value={background} onChange={setBackground} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={render} disabled={busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? ui.processing : ui.process}
        </button>
        {dataUrl ? (
          <button type="button" className="ws-button ws-button-ghost" onClick={onDownload}>
            <Download size={14} /> {ui.download}
          </button>
        ) : null}
      </div>

      {dataUrl ? (
        <div className="ws-qr-preview">
          <img src={dataUrl} alt="QR preview" width={size} height={size} />
        </div>
      ) : null}
    </>
  );
}
