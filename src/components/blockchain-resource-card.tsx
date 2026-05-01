"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Copy } from "lucide-react";
import type { Resource } from "@/lib/blockchain";

type Labels = {
  whyVibe: string;
  install: string;
  example: string;
  promptHeading: string;
  promptHelp: string;
  copyPrompt: string;
  copied: string;
  openLink: string;
  openDocs: string;
};

type Props = {
  resource: Resource;
  labels: Labels;
};

export function BlockchainResourceCard({ resource, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const copy = async (text: string, setFn: (v: boolean) => void) => {
    try {
      await navigator.clipboard?.writeText(text);
      setFn(true);
      window.setTimeout(() => setFn(false), 1400);
    } catch {
      /* noop */
    }
  };

  return (
    <article className={`ws-bc-resource-card ${open ? "is-open" : ""}`}>
      <header className="ws-bc-resource-head">
        <button
          type="button"
          className="ws-bc-resource-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <div className="ws-bc-resource-title">
            <span className="ws-bc-resource-name">{resource.name}</span>
            {resource.badge ? <span className="ws-bc-resource-badge">{resource.badge}</span> : null}
          </div>
          <p className="ws-bc-resource-tagline">{resource.tagline}</p>
          <span className="ws-bc-resource-chev" aria-hidden="true">
            <ChevronDown size={16} />
          </span>
        </button>

        <div className="ws-bc-resource-links">
          <a className="ws-bc-pill" href={resource.url} target="_blank" rel="noreferrer">
            {labels.openLink} <ArrowUpRight size={12} />
          </a>
          {resource.docsUrl !== resource.url ? (
            <a className="ws-bc-pill" href={resource.docsUrl} target="_blank" rel="noreferrer">
              {labels.openDocs} <ArrowUpRight size={12} />
            </a>
          ) : null}
        </div>
      </header>

      {open ? (
        <div className="ws-bc-resource-body">
          <p className="ws-bc-resource-blurb">{resource.blurb}</p>

          <div className="ws-bc-resource-vibe">
            <span className="ws-bc-resource-vibe-tag">{labels.whyVibe}</span>
            <p>{resource.whyVibeCoder}</p>
          </div>

          {resource.installCmd ? (
            <div className="ws-bc-resource-block">
              <header className="ws-bc-resource-block-head">
                <span>{labels.install}</span>
                <button
                  type="button"
                  className="ws-bc-resource-copy"
                  onClick={() => copy(resource.installCmd!, setCopiedInstall)}
                >
                  {copiedInstall ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </header>
              <pre className="ws-bc-resource-code"><code>{resource.installCmd}</code></pre>
            </div>
          ) : null}

          {resource.codeSnippet ? (
            <div className="ws-bc-resource-block">
              <header className="ws-bc-resource-block-head">
                <span>{labels.example}</span>
                <button
                  type="button"
                  className="ws-bc-resource-copy"
                  onClick={() => copy(resource.codeSnippet!, setCopiedSnippet)}
                >
                  {copiedSnippet ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </header>
              <pre className="ws-bc-resource-code"><code>{resource.codeSnippet}</code></pre>
            </div>
          ) : null}

          <div className="ws-bc-resource-prompt">
            <header className="ws-bc-resource-prompt-head">
              <div>
                <span className="ws-bc-resource-prompt-tag">⚡ {labels.promptHeading}</span>
                <p className="ws-bc-resource-prompt-help">{labels.promptHelp}</p>
              </div>
              <button
                type="button"
                className="ws-bc-resource-copy-cta"
                onClick={() => copy(resource.integrationPrompt, setCopiedPrompt)}
              >
                {copiedPrompt ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedPrompt ? labels.copied : labels.copyPrompt}</span>
              </button>
            </header>
            <pre className="ws-bc-resource-prompt-body"><code>{resource.integrationPrompt}</code></pre>
          </div>
        </div>
      ) : null}
    </article>
  );
}
