const BASE_URL = "/vendor/qpdf/";
const INPUT = "/input.pdf";
const OUTPUT = "/output.pdf";

type QpdfFile = { name: string; data: Uint8Array };
type QpdfLog = { stream: string; message: string };

type QpdfRunner = {
  exec: (
    args: string[],
    options: { files: QpdfFile[]; outputs: string[]; onLog: (event: QpdfLog) => void }
  ) => Promise<{ files: QpdfFile[] }>;
};

declare global {
  interface Window {
    WasmZooQpdf?: { loadHosted: (options: { baseUrl: string }) => QpdfRunner };
  }
}

export class QpdfError extends Error {
  constructor(
    message: string,
    readonly code: number
  ) {
    super(message);
  }

  get wrongPassword() {
    return /invalid password/i.test(this.message);
  }
}

export type QpdfResult = { bytes: Uint8Array; warnings: string[] };

let runner: Promise<QpdfRunner> | null = null;

function loadRunner() {
  runner ??= new Promise<QpdfRunner>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${BASE_URL}browser-qpdf.js`;
    script.onload = () => {
      const api = window.WasmZooQpdf;
      if (api) resolve(api.loadHosted({ baseUrl: BASE_URL }));
      else reject(new Error("qpdf failed to load."));
    };
    script.onerror = () => reject(new Error("qpdf failed to load."));
    document.head.append(script);
  }).catch((error: unknown) => {
    runner = null;
    throw error;
  });
  return runner;
}

function exitCode(error: unknown) {
  const match = /exited with code (\d+)/.exec(error instanceof Error ? error.message : "");
  return match ? Number(match[1]) : null;
}

export async function runQpdf(input: Uint8Array, args: (inputPath: string, outputPath: string) => string[]): Promise<QpdfResult> {
  const qpdf = await loadRunner();
  const argv = args(INPUT, OUTPUT);
  const messages: string[] = [];
  const onLog = ({ stream, message }: QpdfLog) => {
    if (stream === "stderr" && message.trim()) messages.push(message.replace(/^qpdf: /, ""));
  };

  try {
    const result = await qpdf.exec(["--warning-exit-0", ...argv], {
      files: [{ name: INPUT, data: input }],
      outputs: [OUTPUT],
      onLog
    });
    const output = result.files.find((file) => file.name === OUTPUT);
    if (!output) throw new QpdfError(messages.join("\n") || "qpdf produced no file.", 2);
    return { bytes: output.data, warnings: messages.filter((line) => line.startsWith("WARNING:")) };
  } catch (error) {
    if (error instanceof QpdfError) throw error;
    const code = exitCode(error);
    if (code === null) throw error;
    const message = messages.join("\n") || `qpdf exited with ${code}`;
    const supplied = argv.some((arg) => arg.startsWith("--password="));
    if (!supplied && /invalid password/i.test(message)) throw new Error("This PDF is encrypted.");
    throw new QpdfError(message, code);
  }
}
