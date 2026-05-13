export type DiagramKind = "auto" | "flowchart" | "c4" | "sequence" | "er" | "state" | "deployment";

export type GenerateRequest = {
  description: string;
  kind?: DiagramKind;
  stack?: string;
  scale?: string;
  refineFrom?: string;
  refineInstruction?: string;
};

export type StreamEvent =
  | { type: "meta"; data: { rateRemaining: number; resetAt: number } }
  | { type: "delta"; data: { text: string } }
  | { type: "usage"; data: Record<string, unknown> }
  | { type: "done"; data: { fullText: string; stopReason: string | null } }
  | { type: "error"; data: { message: string } };

const DEFAULT_API_BASE = "https://architect-api.wienerlabs.dev";

export function apiBase(): string {
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_ARCHITECT_API_URL) {
    return process.env.NEXT_PUBLIC_ARCHITECT_API_URL;
  }
  return DEFAULT_API_BASE;
}

export async function* streamGenerate(req: GenerateRequest): AsyncGenerator<StreamEvent> {
  const res = await fetch(`${apiBase()}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req)
  });

  if (!res.ok || !res.body) {
    let message = `HTTP ${res.status}`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      // ignore
    }
    yield { type: "error", data: { message } };
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const block of events) {
      const lines = block.split("\n");
      let event = "";
      let data = "";
      for (const line of lines) {
        if (line.startsWith("event: ")) event = line.slice(7).trim();
        else if (line.startsWith("data: ")) data += line.slice(6);
      }
      if (!event || !data) continue;
      try {
        const parsed = JSON.parse(data);
        yield { type: event, data: parsed } as StreamEvent;
      } catch {
        // skip malformed
      }
    }
  }
}

export function extractMermaid(text: string): string {
  const fenceMatch = text.match(/```mermaid\s*\n([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].trim();
  const anyFence = text.match(/```[a-z]*\s*\n([\s\S]*?)```/);
  if (anyFence) return anyFence[1].trim();
  return text.trim();
}
