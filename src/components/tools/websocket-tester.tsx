"use client";

import { useEffect, useRef, useState } from "react";
import { Plug, Send, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput, TextArea } from "@/components/options-panel";

type Frame = { dir: "in" | "out" | "sys"; text: string; ts: number };

export default function WebSocketTesterTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [url, setUrl] = useState("wss://echo.websocket.org");
  const [msg, setMsg] = useState("hello");
  const [state, setState] = useState<"disconnected" | "connecting" | "open">("disconnected");
  const [frames, setFrames] = useState<Frame[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  const log = (dir: Frame["dir"], text: string) => {
    setFrames((prev) => [...prev, { dir, text, ts: Date.now() }].slice(-200));
  };

  const connect = () => {
    if (wsRef.current) return;
    setState("connecting");
    log("sys", `connecting to ${url}…`);
    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;
      ws.onopen = () => {
        setState("open");
        log("sys", "open");
      };
      ws.onmessage = (e) => log("in", typeof e.data === "string" ? e.data : "[binary]");
      ws.onerror = () => log("sys", "error");
      ws.onclose = (e) => {
        log("sys", `closed (${e.code} ${e.reason})`);
        setState("disconnected");
        wsRef.current = null;
      };
    } catch (e) {
      log("sys", `connect failed: ${e instanceof Error ? e.message : String(e)}`);
      setState("disconnected");
    }
  };

  const disconnect = () => {
    wsRef.current?.close();
    wsRef.current = null;
    setState("disconnected");
  };

  const send = () => {
    if (state !== "open" || !wsRef.current) return;
    wsRef.current.send(msg);
    log("out", msg);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label="URL" hint="ws:// or wss://">
          <TextInput value={url} onChange={setUrl} placeholder="wss://example.com/socket" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        {state === "open" ? (
          <button type="button" className="ws-button ws-button-ghost" onClick={disconnect}>
            <X size={14} /> Disconnect
          </button>
        ) : (
          <button
            type="button"
            className="ws-button ws-button-primary"
            onClick={connect}
            disabled={state === "connecting" || !url}
          >
            <Plug size={14} /> {state === "connecting" ? "Connecting…" : "Connect"}
          </button>
        )}
      </div>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>Send</span></header>
          <TextArea value={msg} onChange={setMsg} rows={4} placeholder="message body" />
          <button
            type="button"
            className="ws-button ws-button-ghost"
            onClick={send}
            disabled={state !== "open" || !msg}
            style={{ alignSelf: "flex-start" }}
          >
            <Send size={14} /> Send
          </button>
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>Log ({frames.length})</span>
            <span className={`ws-mono ws-ws-state ws-ws-state-${state}`}>{state}</span>
          </header>
          <ul className="ws-ws-log">
            {frames.map((f, i) => (
              <li key={i} className={`ws-ws-frame is-${f.dir}`}>
                <span className="ws-ws-frame-tag">{f.dir === "in" ? "←" : f.dir === "out" ? "→" : "·"}</span>
                <code className="ws-mono">{f.text}</code>
              </li>
            ))}
            {frames.length === 0 ? <li className="ws-text-io-note">no frames yet</li> : null}
          </ul>
        </div>
      </div>
    </>
  );
}
