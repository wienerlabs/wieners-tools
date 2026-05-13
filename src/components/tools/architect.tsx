"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  Copy,
  Check,
  Sparkles,
  Wand2,
  AlertCircle,
  Loader2,
  Code2,
  Eye
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import {
  extractMermaid,
  streamGenerate,
  type DiagramKind,
  type GenerateRequest
} from "@/lib/architect";

type Props = {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
};

type MermaidApi = {
  initialize: (opts: Record<string, unknown>) => void;
  render: (id: string, code: string) => Promise<{ svg: string }>;
};

let mermaidPromise: Promise<MermaidApi> | null = null;

function loadMermaid(): Promise<MermaidApi> {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((m) => {
      const api = m.default as unknown as MermaidApi;
      api.initialize({
        startOnLoad: false,
        theme: "base",
        fontFamily: '"Host Grotesk", system-ui, sans-serif',
        themeVariables: {
          background: "#fff4dd",
          primaryColor: "#fff4dd",
          primaryTextColor: "#0a0a0a",
          primaryBorderColor: "#0a0a0a",
          lineColor: "#0a0a0a",
          secondaryColor: "#0a0a0a",
          tertiaryColor: "#fff4dd",
          edgeLabelBackground: "#fff4dd",
          mainBkg: "#fff4dd",
          nodeBorder: "#0a0a0a",
          clusterBkg: "transparent",
          clusterBorder: "#0a0a0a",
          titleColor: "#0a0a0a",
          fontSize: "14px"
        },
        flowchart: { htmlLabels: true, curve: "basis", padding: 18, useMaxWidth: true },
        sequence: { useMaxWidth: true, mirrorActors: false, actorMargin: 60, messageMargin: 40 },
        er: { useMaxWidth: true },
        state: { useMaxWidth: true }
      });
      return api;
    });
  }
  return mermaidPromise;
}

type Status = "idle" | "streaming" | "ready" | "error";

const KIND_OPTIONS: DiagramKind[] = ["auto", "flowchart", "c4", "sequence", "er", "state", "deployment"];

export default function ArchitectTool({ i18n }: Props) {
  const opts = (i18n.options ?? {}) as Record<string, string>;
  const t = (k: string, fallback = ""): string => opts[k] ?? fallback;

  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");
  const [scale, setScale] = useState("");
  const [kind, setKind] = useState<DiagramKind>("auto");
  const [mermaidSrc, setMermaidSrc] = useState("");
  const [streamingBuffer, setStreamingBuffer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showSource, setShowSource] = useState(false);
  const [copied, setCopied] = useState(false);
  const [renderedSvg, setRenderedSvg] = useState("");
  const [renderError, setRenderError] = useState<string | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);
  const renderId = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const activeSrc = useMemo(() => {
    if (status === "streaming") return extractMermaid(streamingBuffer);
    return mermaidSrc;
  }, [status, streamingBuffer, mermaidSrc]);

  useEffect(() => {
    if (!activeSrc.trim()) {
      setRenderedSvg("");
      setRenderError(null);
      return;
    }
    let cancelled = false;
    const myId = ++renderId.current;
    (async () => {
      try {
        const mermaid = await loadMermaid();
        const { svg } = await mermaid.render(`arch-${myId}`, activeSrc);
        if (cancelled || myId !== renderId.current) return;
        setRenderedSvg(svg);
        setRenderError(null);
      } catch (err: unknown) {
        if (cancelled || myId !== renderId.current) return;
        const msg = err instanceof Error ? err.message : "Mermaid render error";
        setRenderError(msg);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeSrc]);

  const runGenerate = useCallback(
    async (req: GenerateRequest) => {
      setStatus("streaming");
      setError(null);
      setStreamingBuffer("");
      const ctrl = new AbortController();
      abortRef.current?.abort();
      abortRef.current = ctrl;

      let buffer = "";
      try {
        for await (const ev of streamGenerate(req)) {
          if (ctrl.signal.aborted) return;
          if (ev.type === "delta") {
            buffer += ev.data.text;
            setStreamingBuffer(buffer);
          } else if (ev.type === "done") {
            buffer = ev.data.fullText || buffer;
            const extracted = extractMermaid(buffer);
            setMermaidSrc(extracted);
            setStreamingBuffer("");
            setStatus("ready");
          } else if (ev.type === "error") {
            setError(ev.data.message);
            setStatus("error");
          }
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
        setStatus("error");
      }
    },
    []
  );

  const onGenerate = useCallback(() => {
    if (!description.trim() || description.trim().length < 8) return;
    runGenerate({
      description: description.trim(),
      kind,
      stack: stack.trim() || undefined,
      scale: scale.trim() || undefined
    });
  }, [description, kind, stack, scale, runGenerate]);

  const onRefine = useCallback(
    (instruction: string) => {
      if (!mermaidSrc.trim()) return;
      runGenerate({
        description: description.trim() || "(see existing diagram)",
        kind,
        refineFrom: mermaidSrc,
        refineInstruction: instruction
      });
    },
    [mermaidSrc, description, kind, runGenerate]
  );

  const onCopy = useCallback(async () => {
    if (!mermaidSrc.trim()) return;
    try {
      await navigator.clipboard.writeText(mermaidSrc);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  }, [mermaidSrc]);

  const onDownloadSvg = useCallback(() => {
    if (!renderedSvg) return;
    const blob = new Blob([renderedSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "architect.svg";
    a.click();
    URL.revokeObjectURL(url);
  }, [renderedSvg]);

  const onDownloadPng = useCallback(async () => {
    if (!renderedSvg) return;
    const svg = renderedSvg;
    const sizeMatch = svg.match(/viewBox="([\d.\s-]+)"/);
    let width = 1600;
    let height = 900;
    if (sizeMatch) {
      const parts = sizeMatch[1].split(/\s+/).map(Number);
      if (parts.length === 4) {
        const ratio = parts[2] / parts[3];
        width = 2000;
        height = Math.round(width / ratio);
      }
    }
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#fff4dd";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const a = document.createElement("a");
        const pngUrl = URL.createObjectURL(blob);
        a.href = pngUrl;
        a.download = "architect.png";
        a.click();
        URL.revokeObjectURL(pngUrl);
      }, "image/png");
      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  }, [renderedSvg]);

  const isBusy = status === "streaming";
  const hasDiagram = Boolean(mermaidSrc.trim());

  return (
    <div className="ws-architect">
      <aside className="ws-architect-controls">
        <label className="ws-architect-field">
          <span className="ws-architect-field-label">{t("describe", "Describe")}</span>
          <textarea
            className="ws-architect-textarea"
            rows={9}
            value={description}
            placeholder={t("placeholderDescribe", "")}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isBusy}
          />
        </label>

        <div className="ws-architect-row">
          <label className="ws-architect-field">
            <span className="ws-architect-field-label">{t("stack", "Stack")}</span>
            <input
              className="ws-architect-input"
              type="text"
              value={stack}
              placeholder={t("placeholderStack", "")}
              onChange={(e) => setStack(e.target.value)}
              disabled={isBusy}
            />
          </label>
          <label className="ws-architect-field">
            <span className="ws-architect-field-label">{t("scale", "Scale")}</span>
            <input
              className="ws-architect-input"
              type="text"
              value={scale}
              placeholder={t("placeholderScale", "")}
              onChange={(e) => setScale(e.target.value)}
              disabled={isBusy}
            />
          </label>
        </div>

        <label className="ws-architect-field">
          <span className="ws-architect-field-label">{t("kind", "Diagram type")}</span>
          <div className="ws-architect-kinds">
            {KIND_OPTIONS.map((k) => (
              <button
                key={k}
                type="button"
                className={`ws-architect-kind ${kind === k ? "is-active" : ""}`}
                onClick={() => setKind(k)}
                disabled={isBusy}
              >
                {t(`diagram${k.charAt(0).toUpperCase()}${k.slice(1)}`, k)}
              </button>
            ))}
          </div>
        </label>

        <button
          type="button"
          className="ws-architect-primary"
          onClick={onGenerate}
          disabled={isBusy || description.trim().length < 8}
        >
          {isBusy ? <Loader2 size={14} className="ws-spin" /> : <Sparkles size={14} />}
          <span>{isBusy ? t("streaming", "Generating…") : t("generate", "Generate")}</span>
        </button>

        {hasDiagram ? (
          <div className="ws-architect-refines">
            <span className="ws-architect-field-label">
              <Wand2 size={11} /> {t("refine", "Refine")}
            </span>
            <div className="ws-architect-refine-row">
              <button type="button" onClick={() => onRefine("Simplify the diagram. Remove implementation detail nodes; keep top-level containers and the main flow only.")} disabled={isBusy}>
                {t("simpler", "Simpler")}
              </button>
              <button type="button" onClick={() => onRefine("Add an observability subgraph with logging, metrics and tracing, connected to the main backend services.")} disabled={isBusy}>
                {t("addMonitoring", "Add monitoring")}
              </button>
              <button type="button" onClick={() => onRefine("Add dotted-arrow failure / retry / timeout paths between the relevant services, visually subordinate to the happy path.")} disabled={isBusy}>
                {t("addFailure", "Failure paths")}
              </button>
              <button type="button" onClick={() => onRefine("Preserve all semantics but reformat the Mermaid for maximum readability: re-order subgraphs top-down by data flow, normalize all edge labels to 'protocol · payload' format, ensure every node has a classDef.")} disabled={isBusy}>
                {t("reformat", "Clean up")}
              </button>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="ws-architect-error">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        ) : null}
      </aside>

      <section className="ws-architect-canvas">
        <header className="ws-architect-canvas-bar">
          <div className="ws-architect-canvas-tabs">
            <button
              type="button"
              className={`ws-architect-tab ${!showSource ? "is-active" : ""}`}
              onClick={() => setShowSource(false)}
            >
              <Eye size={12} /> {t("preview", "Preview")}
            </button>
            <button
              type="button"
              className={`ws-architect-tab ${showSource ? "is-active" : ""}`}
              onClick={() => setShowSource(true)}
            >
              <Code2 size={12} /> {t("sourceTitle", "Source")}
            </button>
          </div>
          <div className="ws-architect-canvas-actions">
            <button type="button" onClick={onCopy} disabled={!hasDiagram}>
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? t("copied", "Copied") : t("copyMermaid", "Copy")}</span>
            </button>
            <button type="button" onClick={onDownloadSvg} disabled={!renderedSvg}>
              <Download size={12} />
              <span>SVG</span>
            </button>
            <button type="button" onClick={onDownloadPng} disabled={!renderedSvg}>
              <Download size={12} />
              <span>PNG</span>
            </button>
          </div>
        </header>

        {showSource ? (
          <textarea
            className="ws-architect-source"
            value={status === "streaming" ? streamingBuffer : mermaidSrc}
            onChange={(e) => {
              setMermaidSrc(e.target.value);
              setStreamingBuffer("");
              setStatus("ready");
            }}
            spellCheck={false}
            placeholder={t("emptyHint", "")}
          />
        ) : (
          <div className="ws-architect-preview" ref={previewRef}>
            {renderedSvg ? (
              <div className="ws-architect-svg" dangerouslySetInnerHTML={{ __html: renderedSvg }} />
            ) : renderError && hasDiagram ? (
              <div className="ws-architect-empty">
                <AlertCircle size={20} />
                <p className="ws-architect-empty-title">Mermaid render error</p>
                <p className="ws-architect-empty-hint">{renderError}</p>
              </div>
            ) : isBusy ? (
              <div className="ws-architect-empty">
                <Loader2 size={20} className="ws-spin" />
                <p className="ws-architect-empty-title">{t("streaming", "Generating…")}</p>
              </div>
            ) : (
              <div className="ws-architect-empty">
                <Sparkles size={20} />
                <p className="ws-architect-empty-title">{t("emptyTitle", "No diagram yet")}</p>
                <p className="ws-architect-empty-hint">{t("emptyHint", "")}</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
