"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockProps = {
  code: string;
  language?: string;
};

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="ws-code">
      <div className="ws-code-head">
        <span className="ws-code-lang">{language}</span>
        <button type="button" className="ws-code-copy" onClick={handleCopy} aria-label="Copy code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="ws-code-body">
        <code>{code}</code>
      </pre>
    </div>
  );
}
