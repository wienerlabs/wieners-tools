import Link from "next/link";
import { siteName } from "@/lib/site";

export const metadata = {
  title: siteName,
  description: "Free tools that run in your browser. Your files never leave your device."
};

export default function RootPage() {
  return (
    <main className="ws-redirect">
      <p>{siteName}</p>
      <noscript>
        <Link href="/en/">Continue in English</Link>
      </noscript>
      <script
        dangerouslySetInnerHTML={{
          __html:
            '(function(){var l=(navigator.language||"en").slice(0,2);var s=["tr","de","en","ar"];location.replace("/"+(s.indexOf(l)>-1?l:"en")+"/");})();'
        }}
      />
    </main>
  );
}
