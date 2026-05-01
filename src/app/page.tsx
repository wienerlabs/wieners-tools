import Link from "next/link";

export const metadata = {
  title: "Wiener’s Tools",
  description: "Browser-native image toolkit. 100% client-side."
};

export default function RootPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        color: "#eee9e4",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "2rem"
      }}
    >
      <div>
        <p style={{ opacity: 0.6, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>
          wieners-tools
        </p>
        <h1 style={{ fontSize: 28, margin: "1rem 0" }}>Wiener&rsquo;s Tools</h1>
        <noscript>
          <p>
            <Link href="/en/" style={{ color: "#c8a247" }}>
              Continue → /en/
            </Link>
          </p>
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){var l=(navigator.language||"en").slice(0,2);var s=["tr","de","en","ar"];location.replace("/"+(s.indexOf(l)>-1?l:"en")+"/");})();'
          }}
        />
      </div>
    </main>
  );
}
