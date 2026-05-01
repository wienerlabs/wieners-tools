import { SiteShell } from "@/components/site-shell";
import type { Locale } from "@/lib/i18n";
import { content } from "@/lib/content";
import { legalContent } from "@/lib/legal";

export function LegalDocument({
  locale,
  kind
}: {
  locale: Locale;
  kind: "privacy" | "cookies";
}) {
  const doc = legalContent[locale][kind];
  const page = content[locale];

  return (
    <SiteShell locale={locale} variant="compact">
      <article className="ws-doc">
        <p className="ws-doc-eyebrow">{page.hero.eyebrow}</p>
        <h1>{doc.title}</h1>
        <p className="ws-doc-intro">{doc.description}</p>
        <p className="ws-doc-meta">{doc.updatedAt}</p>

        <div className="ws-doc-sections">
          {doc.sections.map((section) => (
            <section key={section.title} className="ws-doc-card">
              <h2>{section.title}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </SiteShell>
  );
}
