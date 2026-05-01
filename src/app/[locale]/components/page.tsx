import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { CodeBlock } from "@/components/code-block";
import PixelBlast from "@/components/pixel-blast";
import TypewriterTitle from "@/components/typewriter-title";
import MagnetLines from "@/components/magnet-lines";
import Cubes from "@/components/cubes";
import FallingText from "@/components/falling-text";
import { content } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function getLocale(params: PageProps["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  const page = content[locale];
  return buildPageMetadata({
    locale,
    slug: "/components/",
    title: page.gallery.title,
    description: page.gallery.intro
  });
}

const SNIPPETS = {
  pixelBlast: `<PixelBlast
  variant="square"
  pixelSize={4}
  color="#000000"
  patternScale={2.4}
  patternDensity={1.05}
  pixelSizeJitter={0.4}
  enableRipples
  rippleSpeed={0.3}
  rippleThickness={0.12}
  rippleIntensityScale={1.2}
  speed={0.4}
  edgeFade={0.35}
  transparent
/>`,
  typewriter: `<TypewriterTitle
  sequences={[
    { text: "compress.", deleteAfter: true },
    { text: "convert.",  deleteAfter: true },
    { text: "edit.",     deleteAfter: true },
    { text: "generate.", deleteAfter: true }
  ]}
  autoLoop
  naturalVariance
/>`,
  magnetLines: `<MagnetLines
  rows={10}
  columns={12}
  containerSize="min(420px, 80vw)"
  lineColor="rgba(0, 0, 0, 0.55)"
  lineWidth="2px"
  lineHeight="22px"
  baseAngle={-10}
/>`,
  cubes: `<Cubes
  gridSize={8}
  maxAngle={28}
  radius={3}
  borderStyle="1px solid rgba(0, 0, 0, 0.18)"
  faceColor="#000000"
  rippleColor="#fff4dd"
  rippleSpeed={1.5}
  autoAnimate
  rippleOnClick
  cellSize={48}
/>`,
  fallingText: `<FallingText
  text={page.fallingHero.text}
  highlightWords={page.fallingHero.highlightWords}
  highlightClass="ft-highlighted"
  trigger="hover"
  backgroundColor="transparent"
  wireframes={false}
  gravity={0.56}
  fontSize="2rem"
  mouseConstraintStiffness={0.9}
/>`,
  codeBlock: `<CodeBlock
  language="tsx"
  code={\`<TypewriterTitle autoLoop naturalVariance />\`}
/>`
};

export default async function ComponentsPage({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];

  const breadcrumbs = breadcrumbSchema([
    { name: page.toolsSection.eyebrow, url: absoluteUrl(`/${locale}/`) },
    { name: page.gallery.title, url: absoluteUrl(`/${locale}/components/`) }
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumbs} />
      <SiteShell locale={locale} variant="compact">
        <section className="ws-gallery-hero">
          <div className="ws-gallery-hero-bg" aria-hidden="true">
            <PixelBlast
              variant="square"
              pixelSize={4}
              color="#000000"
              patternScale={2.4}
              patternDensity={1.05}
              pixelSizeJitter={0.4}
              enableRipples
              rippleSpeed={0.3}
              rippleThickness={0.12}
              rippleIntensityScale={1.2}
              speed={0.4}
              edgeFade={0.35}
              transparent
            />
          </div>
          <div className="ws-gallery-hero-inner">
            <p className="ws-gallery-hero-eyebrow">{page.gallery.eyebrow}</p>
            <h1 className="ws-gallery-hero-title">{page.gallery.title}</h1>
            <p className="ws-gallery-hero-intro">{page.gallery.intro}</p>
            <p className="ws-gallery-hero-audience">{page.gallery.audience}</p>
          </div>
        </section>

        <section className="ws-gallery-list">
          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>PixelBlast</h2>
              <p>WebGL pixel-grid arka plan. Click ripple, ortam akışı, pause-when-offscreen.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-tall">
              <PixelBlast
                variant="circle"
                pixelSize={5}
                color="#000000"
                patternScale={2}
                patternDensity={1}
                pixelSizeJitter={0.2}
                enableRipples
                rippleSpeed={0.4}
                rippleThickness={0.14}
                rippleIntensityScale={1.4}
                speed={0.5}
                edgeFade={0.25}
                transparent
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.pixelBlast} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>TypewriterTitle</h2>
              <p>Yazı dizilerini sırayla yazıp silen, doğal varyanslı caret animasyonu.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-center">
              <TypewriterTitle
                sequences={[
                  { text: "compress.", deleteAfter: true },
                  { text: "convert.", deleteAfter: true },
                  { text: "edit.", deleteAfter: true },
                  { text: "generate.", deleteAfter: true }
                ]}
                autoLoop
                naturalVariance
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.typewriter} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>MagnetLines</h2>
              <p>Pointer pozisyonuna göre dönen çizgi grid&rsquo;i, vanilla DOM.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-center">
              <MagnetLines
                rows={10}
                columns={12}
                containerSize="min(360px, 70vw)"
                lineColor="rgba(0, 0, 0, 0.65)"
                lineWidth="2px"
                lineHeight="22px"
                baseAngle={-10}
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.magnetLines} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>Cubes</h2>
              <p>3D CSS cube grid. Tilt-on-hover + click ripple, opsiyonel auto-animate.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-center">
              <Cubes
                gridSize={6}
                maxAngle={26}
                radius={2}
                borderStyle="1px solid rgba(0, 0, 0, 0.18)"
                faceColor="#000000"
                rippleColor="#fff4dd"
                rippleSpeed={1.4}
                autoAnimate
                rippleOnClick
                cellSize={42}
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.cubes} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>FallingText</h2>
              <p>matter.js destekli kelime fizik animasyonu. Hover ya da scroll ile tetiklenir.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-falling">
              <FallingText
                text="Wiener Tools tarayıcıda hızlı tasarım sistemi monokrom palet."
                highlightWords={["Wiener", "Tools", "tarayıcıda", "monokrom"]}
                highlightClass="ft-highlighted"
                trigger="hover"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.56}
                fontSize="1.6rem"
                mouseConstraintStiffness={0.9}
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.fallingText} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>CodeBlock</h2>
              <p>Bu sayfanın kullandığı kod kutusu. Kopya butonu + dil etiketi.</p>
            </header>
            <div className="ws-gallery-preview">
              <CodeBlock language="tsx" code={SNIPPETS.codeBlock} />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.codeBlock} />
          </article>
        </section>
      </SiteShell>
    </>
  );
}
