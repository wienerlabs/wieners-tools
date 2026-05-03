"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";

const SAMPLE = `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx" }
    }
  }
}`;

type Issue = { severity: "error" | "warn"; path: string; message: string };

type Server = {
  name: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  envCount: number;
  argsHasNetworkFlag: boolean;
};

type Result =
  | { ok: false; issues: Issue[] }
  | { ok: true; servers: Server[]; issues: Issue[] };

function analyze(src: string): Result {
  const issues: Issue[] = [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(src);
  } catch (e) {
    return { ok: false, issues: [{ severity: "error", path: "$", message: e instanceof Error ? e.message : "invalid JSON" }] };
  }
  if (!parsed || typeof parsed !== "object") {
    return { ok: false, issues: [{ severity: "error", path: "$", message: "root must be an object" }] };
  }
  const root = parsed as Record<string, unknown>;
  const serversBlock = root.mcpServers ?? root.mcp_servers ?? root.servers;
  if (!serversBlock || typeof serversBlock !== "object") {
    return { ok: false, issues: [{ severity: "error", path: "$.mcpServers", message: "missing 'mcpServers' object" }] };
  }
  const entries = Object.entries(serversBlock as Record<string, unknown>);
  if (entries.length === 0) issues.push({ severity: "warn", path: "$.mcpServers", message: "no servers defined" });

  const servers: Server[] = entries.map(([name, raw]) => {
    const path = `$.mcpServers.${name}`;
    if (!raw || typeof raw !== "object") {
      issues.push({ severity: "error", path, message: "server entry must be an object" });
      return { name, envCount: 0, argsHasNetworkFlag: false };
    }
    const obj = raw as Record<string, unknown>;
    if (typeof obj.command !== "string" || obj.command.trim().length === 0) {
      issues.push({ severity: "error", path: `${path}.command`, message: "missing 'command' string" });
    }
    if (obj.args !== undefined && (!Array.isArray(obj.args) || !obj.args.every((a) => typeof a === "string"))) {
      issues.push({ severity: "error", path: `${path}.args`, message: "'args' must be an array of strings" });
    }
    let envCount = 0;
    let env: Record<string, string> | undefined;
    if (obj.env !== undefined) {
      if (!obj.env || typeof obj.env !== "object" || Array.isArray(obj.env)) {
        issues.push({ severity: "error", path: `${path}.env`, message: "'env' must be a string→string map" });
      } else {
        env = {};
        for (const [k, v] of Object.entries(obj.env as Record<string, unknown>)) {
          if (typeof v !== "string") {
            issues.push({ severity: "error", path: `${path}.env.${k}`, message: "env value must be a string" });
            continue;
          }
          env[k] = v;
          envCount++;
          if (/^(ghp_|sk_|xox|sk-)[\w-]{10,}$/.test(v)) {
            issues.push({ severity: "warn", path: `${path}.env.${k}`, message: "looks like a real secret — never commit" });
          }
        }
      }
    }
    const args = Array.isArray(obj.args) ? (obj.args as string[]) : undefined;
    const argsHasNetworkFlag = !!args?.some((a) => /^(--network|--allow-net|--internet)/.test(a));
    return {
      name,
      command: typeof obj.command === "string" ? obj.command : undefined,
      args,
      env,
      envCount,
      argsHasNetworkFlag
    };
  });

  return { ok: issues.every((i) => i.severity !== "error"), servers, issues };
}

export default function McpTesterTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [src, setSrc] = useState(SAMPLE);
  const result = useMemo(() => analyze(src), [src]);

  return (
    <>
      <textarea
        className="ws-textarea ws-textarea-mono"
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        rows={16}
        spellCheck={false}
        placeholder="paste your claude_desktop_config.json or .cursor/mcp.json"
      />

      {result.issues.length > 0 ? (
        <ul className="ws-pdf-list" style={{ marginTop: 16 }}>
          {result.issues.map((iss, i) => (
            <li
              key={i}
              className="ws-pdf-row"
              style={{ borderLeftWidth: 4, borderLeftStyle: "solid", borderLeftColor: iss.severity === "error" ? "#b91c1c" : "#d97706" }}
            >
              <span className="ws-pdf-row-name ws-mono">{iss.severity.toUpperCase()}</span>
              <span className="ws-pdf-row-meta ws-mono">{iss.path}</span>
              <span>{iss.message}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {"servers" in result ? (
        <div style={{ marginTop: 16 }}>
          <p className="ws-text-io-note">
            <strong>{result.servers.length}</strong> server{result.servers.length === 1 ? "" : "s"} parsed
          </p>
          <ul className="ws-pdf-list">
            {result.servers.map((s) => (
              <li key={s.name} className="ws-pdf-row" style={{ gridTemplateColumns: "1fr 2fr auto" }}>
                <span className="ws-pdf-row-name"><strong>{s.name}</strong></span>
                <span className="ws-mono" style={{ wordBreak: "break-all" }}>
                  {s.command} {s.args?.join(" ")}
                </span>
                <span className="ws-pdf-row-meta">
                  {s.envCount > 0 ? `${s.envCount} env` : "no env"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
