"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select } from "@/components/options-panel";
import { content } from "@/lib/content";

type Algo = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

function md5(bytes: Uint8Array): string {
  const rotateLeft = (x: number, n: number) => (x << n) | (x >>> (32 - n));
  const add32 = (a: number, b: number) => (a + b) | 0;
  const f = (x: number, y: number, z: number) => (x & y) | (~x & z);
  const g = (x: number, y: number, z: number) => (x & z) | (y & ~z);
  const h = (x: number, y: number, z: number) => x ^ y ^ z;
  const i = (x: number, y: number, z: number) => y ^ (x | ~z);
  const cmn = (q: number, a: number, b: number, x: number, s: number, t: number) =>
    add32(rotateLeft(add32(add32(a, q), add32(x, t)), s), b);
  const ff = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
    cmn(f(b, c, d), a, b, x, s, t);
  const gg = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
    cmn(g(b, c, d), a, b, x, s, t);
  const hh = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
    cmn(h(b, c, d), a, b, x, s, t);
  const ii = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
    cmn(i(b, c, d), a, b, x, s, t);

  const len = bytes.length;
  const totalBitsLow = (len << 3) >>> 0;
  const totalBitsHigh = Math.floor((len * 8) / 0x100000000);
  const padLen = 64 - ((len + 9) % 64 || 64) + 8;
  const padded = new Uint8Array(len + 1 + padLen);
  padded.set(bytes);
  padded[len] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setUint32(padded.length - 8, totalBitsLow, true);
  dv.setUint32(padded.length - 4, totalBitsHigh, true);

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  for (let chunk = 0; chunk < padded.length; chunk += 64) {
    const x = new Array<number>(16);
    for (let j = 0; j < 16; j++) x[j] = dv.getUint32(chunk + j * 4, true);
    const oa = a; const ob = b; const oc = c; const od = d;
    a = ff(a, b, c, d, x[0], 7, -680876936);
    d = ff(d, a, b, c, x[1], 12, -389564586);
    c = ff(c, d, a, b, x[2], 17, 606105819);
    b = ff(b, c, d, a, x[3], 22, -1044525330);
    a = ff(a, b, c, d, x[4], 7, -176418897);
    d = ff(d, a, b, c, x[5], 12, 1200080426);
    c = ff(c, d, a, b, x[6], 17, -1473231341);
    b = ff(b, c, d, a, x[7], 22, -45705983);
    a = ff(a, b, c, d, x[8], 7, 1770035416);
    d = ff(d, a, b, c, x[9], 12, -1958414417);
    c = ff(c, d, a, b, x[10], 17, -42063);
    b = ff(b, c, d, a, x[11], 22, -1990404162);
    a = ff(a, b, c, d, x[12], 7, 1804603682);
    d = ff(d, a, b, c, x[13], 12, -40341101);
    c = ff(c, d, a, b, x[14], 17, -1502002290);
    b = ff(b, c, d, a, x[15], 22, 1236535329);
    a = gg(a, b, c, d, x[1], 5, -165796510);
    d = gg(d, a, b, c, x[6], 9, -1069501632);
    c = gg(c, d, a, b, x[11], 14, 643717713);
    b = gg(b, c, d, a, x[0], 20, -373897302);
    a = gg(a, b, c, d, x[5], 5, -701558691);
    d = gg(d, a, b, c, x[10], 9, 38016083);
    c = gg(c, d, a, b, x[15], 14, -660478335);
    b = gg(b, c, d, a, x[4], 20, -405537848);
    a = gg(a, b, c, d, x[9], 5, 568446438);
    d = gg(d, a, b, c, x[14], 9, -1019803690);
    c = gg(c, d, a, b, x[3], 14, -187363961);
    b = gg(b, c, d, a, x[8], 20, 1163531501);
    a = gg(a, b, c, d, x[13], 5, -1444681467);
    d = gg(d, a, b, c, x[2], 9, -51403784);
    c = gg(c, d, a, b, x[7], 14, 1735328473);
    b = gg(b, c, d, a, x[12], 20, -1926607734);
    a = hh(a, b, c, d, x[5], 4, -378558);
    d = hh(d, a, b, c, x[8], 11, -2022574463);
    c = hh(c, d, a, b, x[11], 16, 1839030562);
    b = hh(b, c, d, a, x[14], 23, -35309556);
    a = hh(a, b, c, d, x[1], 4, -1530992060);
    d = hh(d, a, b, c, x[4], 11, 1272893353);
    c = hh(c, d, a, b, x[7], 16, -155497632);
    b = hh(b, c, d, a, x[10], 23, -1094730640);
    a = hh(a, b, c, d, x[13], 4, 681279174);
    d = hh(d, a, b, c, x[0], 11, -358537222);
    c = hh(c, d, a, b, x[3], 16, -722521979);
    b = hh(b, c, d, a, x[6], 23, 76029189);
    a = hh(a, b, c, d, x[9], 4, -640364487);
    d = hh(d, a, b, c, x[12], 11, -421815835);
    c = hh(c, d, a, b, x[15], 16, 530742520);
    b = hh(b, c, d, a, x[2], 23, -995338651);
    a = ii(a, b, c, d, x[0], 6, -198630844);
    d = ii(d, a, b, c, x[7], 10, 1126891415);
    c = ii(c, d, a, b, x[14], 15, -1416354905);
    b = ii(b, c, d, a, x[5], 21, -57434055);
    a = ii(a, b, c, d, x[12], 6, 1700485571);
    d = ii(d, a, b, c, x[3], 10, -1894986606);
    c = ii(c, d, a, b, x[10], 15, -1051523);
    b = ii(b, c, d, a, x[1], 21, -2054922799);
    a = ii(a, b, c, d, x[8], 6, 1873313359);
    d = ii(d, a, b, c, x[15], 10, -30611744);
    c = ii(c, d, a, b, x[6], 15, -1560198380);
    b = ii(b, c, d, a, x[13], 21, 1309151649);
    a = ii(a, b, c, d, x[4], 6, -145523070);
    d = ii(d, a, b, c, x[11], 10, -1120210379);
    c = ii(c, d, a, b, x[2], 15, 718787259);
    b = ii(b, c, d, a, x[9], 21, -343485551);
    a = add32(a, oa); b = add32(b, ob); c = add32(c, oc); d = add32(d, od);
  }
  const out = new Uint8Array(16);
  const odv = new DataView(out.buffer);
  odv.setUint32(0, a >>> 0, true);
  odv.setUint32(4, b >>> 0, true);
  odv.setUint32(8, c >>> 0, true);
  odv.setUint32(12, d >>> 0, true);
  return Array.from(out, (x) => x.toString(16).padStart(2, "0")).join("");
}

async function hash(algo: Algo, bytes: Uint8Array): Promise<string> {
  if (algo === "MD5") return md5(bytes);
  const buffer = bytes.slice().buffer as ArrayBuffer;
  const digest = await crypto.subtle.digest(algo, buffer);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGeneratorTool({
  locale,
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const [algo, setAlgo] = useState<Algo>("SHA-256");
  const [text, setText] = useState("hello world");
  const [output, setOutput] = useState("");
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    const bytes = new TextEncoder().encode(text);
    hash(algo, bytes).then((h) => {
      if (active) setOutput(h);
    });
    return () => {
      active = false;
    };
  }, [text, algo]);

  const onFile = async (file: File) => {
    setFileMeta({ name: file.name, size: file.size });
    const buf = new Uint8Array(await file.arrayBuffer());
    const h = await hash(algo, buf);
    setOutput(h);
  };

  const onCopy = async () => {
    await navigator.clipboard?.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.algorithm ?? "Algorithm"}>
          <Select<Algo>
            value={algo}
            options={[
              { value: "MD5", label: "MD5" },
              { value: "SHA-1", label: "SHA-1" },
              { value: "SHA-256", label: "SHA-256" },
              { value: "SHA-384", label: "SHA-384" },
              { value: "SHA-512", label: "SHA-512" }
            ]}
            onChange={setAlgo}
          />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>Input</span>
            <div className="ws-text-io-actions">
              <button type="button" className="ws-icon-button" onClick={() => fileInputRef.current?.click()}>
                <Upload size={14} />
                <span>{ui.pickFile}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFile(f);
                }}
              />
            </div>
          </header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={text}
            onChange={(e) => {
              setFileMeta(null);
              setText(e.target.value);
            }}
            rows={8}
            spellCheck={false}
          />
          {fileMeta ? <p className="ws-text-io-note">{fileMeta.name} · {fileMeta.size.toLocaleString()} bytes</p> : null}
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>{algo}</span>
            <div className="ws-text-io-actions">
              <button type="button" className="ws-icon-button" onClick={onCopy} disabled={!output}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={output}
            readOnly
            rows={4}
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
