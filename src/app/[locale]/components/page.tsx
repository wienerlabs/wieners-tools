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
import SplitText from "@/components/split-text";
import BlurText from "@/components/blur-text";
import CircularText from "@/components/circular-text";
import TextType from "@/components/text-type";
import Shuffle from "@/components/shuffle";
import ShinyText from "@/components/shiny-text";
import TextPressure from "@/components/text-pressure";
import StickerPeel from "@/components/sticker-peel";
import FaultyTerminal from "@/components/faulty-terminal";
import Dither from "@/components/dither";
import Galaxy from "@/components/galaxy";
import GradientBlinds from "@/components/gradient-blinds";
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
/>`,
  splitText: `<SplitText
  text="Hello, you!"
  className="text-2xl font-semibold text-center"
  delay={50}
  duration={1.25}
  ease="easeOut"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
/>`,
  blurText: `<BlurText
  text="Isn't this so cool?!"
  delay={200}
  animateBy="words"
  direction="top"
  className="text-2xl mb-8"
/>`,
  circularText: `<CircularText
  text="WIENER*TOOLS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
/>`,
  textType: `<TextType
  text={["Text typing effect", "for your websites", "Happy coding!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor
  cursorCharacter="_"
  deletingSpeed={50}
  cursorBlinkDuration={0.5}
/>`,
  shuffle: `<Shuffle
  text="Hello World"
  shuffleDirection="right"
  duration={0.35}
  animationMode="evenodd"
  shuffleTimes={1}
  stagger={0.03}
  threshold={0.1}
  triggerOnce={true}
  triggerOnHover
  respectReducedMotion={true}
  loop={false}
  loopDelay={0}
/>`,
  shinyText: `<ShinyText
  text="✨ Shiny Text Effect"
  speed={2}
  color="#000000"
  shineColor="#fff4dd"
  spread={120}
  direction="left"
  yoyo={false}
  pauseOnHover={false}
/>`,
  textPressure: `<div style={{ position: "relative", height: "300px" }}>
  <TextPressure
    text="Hello!"
    flex
    alpha={false}
    stroke={false}
    width
    weight
    italic
    textColor="#000000"
    strokeColor="#fff4dd"
    minFontSize={36}
  />
</div>`,
  stickerPeel: `<StickerPeel
  imageSrc="/logo.jpg"
  width={200}
  rotate={0}
  peelBackHoverPct={30}
  peelBackActivePct={40}
  shadowIntensity={0.5}
  lightingIntensity={0.1}
  initialPosition={{ x: 0, y: 0 }}
  peelDirection={0}
/>`,
  faultyTerminal: `<div style={{ width: "100%", height: 600, position: "relative" }}>
  <FaultyTerminal
    scale={1.5}
    gridMul={[2, 1]}
    digitSize={1.2}
    timeScale={0.5}
    pause={false}
    scanlineIntensity={0.5}
    glitchAmount={1}
    flickerAmount={1}
    noiseAmp={1}
    chromaticAberration={0}
    dither={0}
    curvature={0.1}
    tint="#A7EF9E"
    mouseReact
    mouseStrength={0.5}
    pageLoadAnimation
    brightness={0.6}
  />
</div>`,
  dither: `<div style={{ width: "100%", height: 600, position: "relative" }}>
  <Dither
    waveColor={[0.5, 0.5, 0.5]}
    disableAnimation={false}
    enableMouseInteraction
    mouseRadius={0.3}
    colorNum={4}
    waveAmplitude={0.3}
    waveFrequency={3}
    waveSpeed={0.05}
  />
</div>`,
  galaxy: `<div style={{ width: "100%", height: 600, position: "relative" }}>
  <Galaxy
    mouseRepulsion
    mouseInteraction
    density={1}
    glowIntensity={0.3}
    saturation={0}
    hueShift={140}
    twinkleIntensity={0.3}
    rotationSpeed={0.1}
    repulsionStrength={2}
    autoCenterRepulsion={0}
    starSpeed={0.5}
    speed={1}
  />
</div>`,
  gradientBlinds: `<div style={{ width: "100%", height: 600, position: "relative" }}>
  <GradientBlinds
    gradientColors={["#FF9FFC", "#5227FF"]}
    angle={0}
    noise={0.3}
    blindCount={12}
    blindMinWidth={50}
    spotlightRadius={0.5}
    spotlightSoftness={1}
    spotlightOpacity={1}
    mouseDampening={0.15}
    distortAmount={0}
    shineDirection="left"
    mixBlendMode="lighten"
  />
</div>`
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
        <section className="ws-gallery-hero ws-gallery-hero-bare" aria-hidden="true">
          <div className="ws-gallery-hero-bg">
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
        </section>

        <section className="ws-gallery-intro">
          <div className="ws-gallery-intro-inner">
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

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>SplitText</h2>
              <p>Karakter / kelime / satır bazında stagger&rsquo;li giriş animasyonu. IntersectionObserver tetikli.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-center">
              <SplitText
                text="Hello, you!"
                delay={50}
                duration={1.1}
                ease="easeOut"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-50px"
                textAlign="center"
                className="ws-anim-h1"
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.splitText} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>BlurText</h2>
              <p>Blur+offset&rsquo;ten kelime/karakter sırasıyla netleşme. Yön (top/bottom/left/right) seçilebilir.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-center">
              <BlurText
                text="Isn't this so cool?!"
                delay={160}
                animateBy="words"
                direction="top"
                className="ws-anim-h1"
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.blurText} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>CircularText</h2>
              <p>Sürekli dönen dairesel yazı. Hover&rsquo;da hızlanır / yavaşlar / durur / çıldırır.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-center">
              <CircularText
                text="WIENER*TOOLS*COMPONENTS*"
                spinDuration={20}
                onHover="speedUp"
                size={220}
                fontSize={14}
                letterSpacing={2}
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.circularText} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>TextType</h2>
              <p>Çoklu metin sırasıyla yazılır + silinir. Sabit veya değişken hız, özelleştirilebilir caret.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-center">
              <span className="ws-anim-h1">
                <TextType
                  text={["Text typing effect", "for your websites", "Happy coding!"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  deletingSpeed={50}
                  cursorCharacter="_"
                  cursorBlinkDuration={0.5}
                />
              </span>
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.textType} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>Shuffle</h2>
              <p>Karakterler rastgele harflerden geçerek hedefe oturur. Hover veya viewport tetikli.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-center">
              <span className="ws-anim-h1">
                <Shuffle
                  text="Hello World"
                  shuffleDirection="right"
                  duration={0.45}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  stagger={0.04}
                  triggerOnce={false}
                  triggerOnHover
                  loop={false}
                />
              </span>
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.shuffle} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>ShinyText</h2>
              <p>Metin üzerinden geçen parlak bant. Pure CSS, mask + linear-gradient.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-center ws-gallery-preview-dark">
              <span className="ws-anim-h1">
                <ShinyText
                  text="✨ Shiny Text Effect"
                  speed={2.4}
                  color="rgba(255, 244, 221, 0.45)"
                  shineColor="#fff4dd"
                  spread={140}
                  direction="left"
                />
              </span>
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.shinyText} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>TextPressure</h2>
              <p>Variable font (Compressa VF) + cursor mesafesine bağlı weight/width/italic. Mouse&rsquo;a yaklaştırın.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-tall ws-gallery-preview-pressure">
              <TextPressure
                text="Wiener!"
                flex
                alpha={false}
                stroke={false}
                width
                weight
                italic
                textColor="#000000"
                strokeColor="#fff4dd"
                minFontSize={36}
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.textPressure} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>StickerPeel</h2>
              <p>Hover&rsquo;da köşeden kıvrılan sticker efekti. Drag ile yerleştirilebilir; logomuzla sahnede.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-center ws-gallery-preview-sticker">
              <StickerPeel
                imageSrc="/logo.jpg"
                width={200}
                rotate={-6}
                peelBackHoverPct={28}
                peelBackActivePct={42}
                shadowIntensity={0.6}
                lightingIntensity={0.18}
                peelDirection={0}
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.stickerPeel} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>FaultyTerminal</h2>
              <p>WebGL CRT terminal — karakter grid, scanlines, glitch, flicker, curvature. Mouse&rsquo;a tepki verir.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-tall ws-gallery-preview-pressure ws-gallery-preview-dark">
              <FaultyTerminal
                scale={1.5}
                gridMul={[2, 1]}
                digitSize={1.2}
                timeScale={0.5}
                scanlineIntensity={0.5}
                glitchAmount={1}
                flickerAmount={1}
                noiseAmp={1}
                chromaticAberration={0}
                dither={0}
                curvature={0.1}
                tint="#A7EF9E"
                mouseReact
                mouseStrength={0.5}
                pageLoadAnimation
                brightness={0.6}
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.faultyTerminal} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>Dither</h2>
              <p>Bayer-dithered sinüs dalga. Mouse imleci yakınlığa göre dalgayı bozar.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-tall ws-gallery-preview-pressure ws-gallery-preview-dark">
              <Dither
                waveColor={[1.0, 0.96, 0.87]}
                disableAnimation={false}
                enableMouseInteraction
                mouseRadius={0.3}
                colorNum={4}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.05}
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.dither} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>Galaxy</h2>
              <p>WebGL spiral parçacık galaksisi. Mouse repulsion, twinkle, hue-shift ve rotation.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-tall ws-gallery-preview-pressure ws-gallery-preview-dark">
              <Galaxy
                mouseRepulsion
                mouseInteraction
                density={1}
                glowIntensity={0.3}
                saturation={0}
                hueShift={140}
                twinkleIntensity={0.3}
                rotationSpeed={0.1}
                repulsionStrength={2}
                autoCenterRepulsion={0}
                starSpeed={0.5}
                speed={1}
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.galaxy} />
          </article>

          <article className="ws-gallery-item">
            <header className="ws-gallery-item-head">
              <h2>GradientBlinds</h2>
              <p>Dikey gradient bantlar + imleci takip eden spotlight. Blend-mode ile efekt katmanlanır.</p>
            </header>
            <div className="ws-gallery-preview ws-gallery-preview-tall ws-gallery-preview-pressure ws-gallery-preview-dark">
              <GradientBlinds
                gradientColors={["#FF9FFC", "#5227FF"]}
                angle={0}
                noise={0.3}
                blindCount={12}
                blindMinWidth={50}
                spotlightRadius={0.5}
                spotlightSoftness={1}
                spotlightOpacity={1}
                mouseDampening={0.15}
                distortAmount={0}
                shineDirection="left"
                mixBlendMode="lighten"
              />
            </div>
            <CodeBlock language="tsx" code={SNIPPETS.gradientBlinds} />
          </article>
        </section>
      </SiteShell>
    </>
  );
}
