const WASM_URL = "/vendor/qpdf/qpdf.wasm";

type QpdfRuntime = {
  callMain: (args: string[]) => number;
  FS: {
    writeFile: (path: string, data: Uint8Array) => void;
    readFile: (path: string) => Uint8Array;
  };
};

type QpdfFactory = (options: { locateFile: () => string }) => Promise<QpdfRuntime>;

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

function exitCode(qpdf: QpdfRuntime, argv: string[]) {
  try {
    return qpdf.callMain(argv);
  } catch (error) {
    const status = (error as { status?: number }).status;
    if (typeof status !== "number") throw error;
    return status;
  }
}

export async function runQpdf(input: Uint8Array, args: (inputPath: string, outputPath: string) => string[]): Promise<QpdfResult> {
  const factory = (await import("@neslinesli93/qpdf-wasm")).default as unknown as QpdfFactory;
  const argv = args("/input.pdf", "/output.pdf");
  const messages: string[] = [];
  const { log, error: logError } = console;
  console.log = () => {};
  console.error = (...parts: unknown[]) => messages.push(parts.join(" ").replace(/^this\.program: /, ""));
  let qpdf: QpdfRuntime;
  let code: number;
  try {
    qpdf = await factory({ locateFile: () => WASM_URL });
    qpdf.FS.writeFile("/input.pdf", input);
    code = exitCode(qpdf, argv);
  } finally {
    console.log = log;
    console.error = logError;
  }

  if (code !== 0 && code !== 3) {
    const message = messages.join("\n") || `qpdf exited with ${code}`;
    const supplied = argv.some((arg) => arg.startsWith("--password="));
    if (!supplied && /invalid password/i.test(message)) throw new Error("This PDF is encrypted.");
    throw new QpdfError(message, code);
  }
  return { bytes: qpdf.FS.readFile("/output.pdf"), warnings: messages };
}
