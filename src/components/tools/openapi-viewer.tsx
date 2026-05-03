"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";

const SAMPLE = `openapi: 3.0.3
info:
  title: Wiener Pets API
  version: 0.1.0
paths:
  /pets:
    get:
      summary: List pets
      parameters:
        - name: limit
          in: query
          schema: { type: integer }
      responses:
        "200": { description: A page of pets }
    post:
      summary: Create a pet
      responses:
        "201": { description: Created }
  /pets/{id}:
    get:
      summary: Read one pet
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string }
      responses:
        "200": { description: A pet }
        "404": { description: Not found }
`;

type Param = {
  name: string;
  in: string;
  required?: boolean;
  type?: string;
};

type Op = {
  method: string;
  summary?: string;
  parameters: Param[];
  responses: Record<string, string>;
};

type Endpoint = {
  path: string;
  ops: Op[];
};

const METHODS = ["get", "post", "put", "patch", "delete", "head", "options"] as const;

function pickType(schema: unknown): string | undefined {
  if (!schema || typeof schema !== "object") return undefined;
  const t = (schema as Record<string, unknown>).type;
  return typeof t === "string" ? t : undefined;
}

function paramOf(raw: unknown): Param | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name : null;
  const where = typeof o.in === "string" ? o.in : null;
  if (!name || !where) return null;
  return {
    name,
    in: where,
    required: !!o.required,
    type: pickType(o.schema)
  };
}

function parseSpec(spec: unknown): { ok: true; title: string; version: string; endpoints: Endpoint[] } | { ok: false; error: string } {
  if (!spec || typeof spec !== "object") return { ok: false, error: "spec must be an object" };
  const s = spec as Record<string, unknown>;
  const info = (s.info as Record<string, unknown>) ?? {};
  const title = typeof info.title === "string" ? info.title : "(untitled)";
  const version = typeof info.version === "string" ? info.version : "?";
  const paths = s.paths as Record<string, unknown> | undefined;
  if (!paths || typeof paths !== "object") return { ok: false, error: "spec missing 'paths'" };

  const endpoints: Endpoint[] = Object.entries(paths).map(([path, pathItem]) => {
    const ops: Op[] = [];
    if (!pathItem || typeof pathItem !== "object") return { path, ops };
    for (const method of METHODS) {
      const opRaw = (pathItem as Record<string, unknown>)[method];
      if (!opRaw || typeof opRaw !== "object") continue;
      const op = opRaw as Record<string, unknown>;
      const params = Array.isArray(op.parameters) ? op.parameters.map(paramOf).filter((p): p is Param => p != null) : [];
      const responses: Record<string, string> = {};
      if (op.responses && typeof op.responses === "object") {
        for (const [code, val] of Object.entries(op.responses as Record<string, unknown>)) {
          const desc = val && typeof val === "object" ? ((val as Record<string, unknown>).description as string | undefined) ?? "" : "";
          responses[code] = desc;
        }
      }
      ops.push({
        method: method.toUpperCase(),
        summary: typeof op.summary === "string" ? op.summary : undefined,
        parameters: params,
        responses
      });
    }
    return { path, ops };
  });
  return { ok: true, title, version, endpoints };
}

const METHOD_COLORS: Record<string, string> = {
  GET: "#16a34a",
  POST: "#2563eb",
  PUT: "#d97706",
  PATCH: "#7c3aed",
  DELETE: "#dc2626",
  HEAD: "#64748b",
  OPTIONS: "#64748b"
};

export default function OpenApiViewerTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [src, setSrc] = useState(SAMPLE);
  const [parsed, setParsed] = useState<ReturnType<typeof parseSpec> | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    setBusy(true);
    (async () => {
      try {
        const yaml = await import("js-yaml");
        const data = yaml.load(src);
        if (!active) return;
        setParsed(parseSpec(data));
      } catch (e) {
        if (active) setParsed({ ok: false, error: e instanceof Error ? e.message : String(e) });
      } finally {
        if (active) setBusy(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [src]);

  return (
    <div className="ws-text-io" style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)" }}>
      <div className="ws-text-io-pane">
        <header className="ws-text-io-head"><span>OpenAPI YAML / JSON</span></header>
        <textarea
          className="ws-textarea ws-textarea-mono"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          rows={20}
          spellCheck={false}
        />
      </div>
      <div className="ws-text-io-pane">
        <header className="ws-text-io-head">
          <span>{busy ? "Parsing…" : parsed && parsed.ok ? `${parsed.title} · ${parsed.version}` : "Result"}</span>
        </header>
        {parsed && !parsed.ok ? (
          <p className="ws-text-io-note ws-text-io-error">{parsed.error}</p>
        ) : parsed && parsed.ok ? (
          <ul className="ws-pdf-list">
            {parsed.endpoints.map((ep) => (
              <li key={ep.path} className="ws-pdf-row" style={{ display: "block" }}>
                <code className="ws-mono" style={{ fontWeight: 700 }}>{ep.path}</code>
                <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", display: "flex", flexDirection: "column", gap: 6 }}>
                  {ep.ops.map((op) => (
                    <li key={op.method} style={{ display: "grid", gridTemplateColumns: "70px 1fr auto", gap: 12, alignItems: "center" }}>
                      <span
                        className="ws-mono"
                        style={{
                          fontWeight: 700,
                          fontSize: 11,
                          padding: "2px 8px",
                          borderRadius: 4,
                          color: "#fff",
                          background: METHOD_COLORS[op.method] ?? "#000",
                          textAlign: "center"
                        }}
                      >
                        {op.method}
                      </span>
                      <span style={{ minWidth: 0 }}>
                        {op.summary ? <span>{op.summary}</span> : <span className="ws-text-io-note">no summary</span>}
                        {op.parameters.length > 0 ? (
                          <div className="ws-mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                            params: {op.parameters.map((p) => `${p.name}(${p.in}${p.required ? " *" : ""})`).join(", ")}
                          </div>
                        ) : null}
                      </span>
                      <span className="ws-mono" style={{ fontSize: 11, color: "var(--muted)" }}>
                        {Object.keys(op.responses).join(" ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
