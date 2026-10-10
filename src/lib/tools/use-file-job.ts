import { useState } from "react";

export type JobResult = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export function useFileJob() {
  const [files, setFilesState] = useState<File[]>([]);
  const [results, setResults] = useState<JobResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const setFiles = (next: File[]) => {
    setFilesState(next);
    setResults([]);
    setError(null);
  };

  const run = async (job: (file: File) => Promise<JobResult[]>) => {
    const file = files[0];
    if (!file || busy) return;
    setBusy(true);
    setError(null);
    setResults([]);
    try {
      setResults(await job(file));
    } catch (caught) {
      setError(caught);
    } finally {
      setBusy(false);
    }
  };

  return { files, setFiles, results, busy, error, run };
}
