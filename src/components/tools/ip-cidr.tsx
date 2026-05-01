"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput } from "@/components/options-panel";

function ipToInt(ip: string): number {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
    throw new Error(`invalid IPv4: ${ip}`);
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function intToIp(n: number): string {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join(".");
}

function calc(input: string) {
  const [ipPart, prefixPart] = input.trim().split("/");
  const prefix = parseInt(prefixPart ?? "32", 10);
  if (Number.isNaN(prefix) || prefix < 0 || prefix > 32) throw new Error("prefix must be 0–32");
  const ip = ipToInt(ipPart);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = prefix === 32 ? 1 : Math.pow(2, 32 - prefix);
  const usable = prefix >= 31 ? total : Math.max(0, total - 2);
  const firstHost = prefix >= 31 ? network : (network + 1) >>> 0;
  const lastHost = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;
  return {
    ip: intToIp(ip),
    cidr: `${intToIp(network)}/${prefix}`,
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    mask: intToIp(mask),
    firstHost: intToIp(firstHost),
    lastHost: intToIp(lastHost),
    total,
    usable,
    binary: intToIp(ip).split(".").map((o) => parseInt(o, 10).toString(2).padStart(8, "0")).join(".")
  };
}

export default function IpCidrTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [input, setInput] = useState("10.0.0.42/24");

  const result = useMemo(() => {
    try {
      return { ok: true as const, value: calc(input) };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : String(e) };
    }
  }, [input]);

  return (
    <>
      <OptionsPanel>
        <FieldRow label="IP / CIDR" hint="örn. 192.168.1.10/24">
          <TextInput value={input} onChange={setInput} placeholder="10.0.0.0/24" />
        </FieldRow>
      </OptionsPanel>

      {!result.ok ? (
        <p className="ws-text-io-note ws-text-io-error">{result.error}</p>
      ) : (
        <ul className="ws-color-formats">
          {([
            ["IP", result.value.ip],
            ["CIDR", result.value.cidr],
            ["Network", result.value.network],
            ["Broadcast", result.value.broadcast],
            ["Subnet mask", result.value.mask],
            ["First host", result.value.firstHost],
            ["Last host", result.value.lastHost],
            ["Total addresses", result.value.total.toLocaleString()],
            ["Usable hosts", result.value.usable.toLocaleString()],
            ["Binary", result.value.binary]
          ] as const).map(([label, value]) => (
            <li key={label}>
              <span className="ws-color-label">{label}</span>
              <code className="ws-mono" style={{ wordBreak: "break-all" }}>{value}</code>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
