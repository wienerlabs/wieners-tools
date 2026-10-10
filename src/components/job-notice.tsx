import type { Locale } from "@/lib/i18n";
import { content } from "@/lib/content";
import { isEncryptedPdfError } from "@/lib/pdf-tools";
import { QpdfError } from "@/lib/qpdf";

export function JobNotice({ locale, error }: { locale: Locale; error: unknown }) {
  if (!error) return null;
  const ui = content[locale].workbench;

  if (isEncryptedPdfError(error)) {
    return (
      <p className="ws-notice" data-tone="error" role="alert">
        {ui.encryptedPdf} <a href={`/${locale}/tools/pdf-unlock/`}>{ui.unlockTool}</a>
      </p>
    );
  }

  if (error instanceof QpdfError && error.wrongPassword) {
    return (
      <p className="ws-notice" data-tone="error" role="alert">
        {ui.wrongPassword}
      </p>
    );
  }

  const detail = error instanceof Error ? error.message.split("\n")[0] : "";
  return (
    <p className="ws-notice" data-tone="error" role="alert">
      {ui.failed}
      {detail ? <span className="ws-notice-detail">{detail}</span> : null}
    </p>
  );
}
