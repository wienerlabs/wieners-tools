import type { Locale } from "./i18n";

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    proof: string[];
    typewriter: string[];
  };
  toolsSection: {
    eyebrow: string;
    title: string;
    intro: string;
    statusReady: string;
    statusBeta: string;
    statusSoon: string;
    badgeAi: string;
    badgeBeta: string;
    badgeNew: string;
    badgeFast: string;
    badgeClientSide: string;
  };
  about: {
    title: string;
    intro: string;
    sections: Array<{ title: string; body: string }>;
    ctaLabel: string;
    ctaUrl: string;
  };
  feedback: {
    title: string;
    intro: string;
    mailLabel: string;
    githubLabel: string;
    note: string;
  };
  errorPages: {
    notFoundTitle: string;
    notFoundText: string;
    backHome: string;
  };
  workbench: {
    dropTitle: string;
    dropHint: string;
    dropOr: string;
    pickFile: string;
    paste: string;
    process: string;
    processing: string;
    download: string;
    downloadAll: string;
    reset: string;
    addMore: string;
    files: string;
    file: string;
    soonTitle: string;
    soonText: string;
    privacyNote: string;
  };
  fallingHero: {
    eyebrow: string;
    text: string;
    highlightWords: string[];
    hint: string;
  };
  gallery: {
    nav: string;
    eyebrow: string;
    title: string;
    intro: string;
    previewLabel: string;
    codeLabel: string;
    audience: string;
  };
  cardNav: {
    menuLabel: string;
    closeLabel: string;
    ctaLabel: string;
    items: Array<{
      label: string;
      bgColor?: string;
      textColor?: string;
      links: Array<{ label: string; href: string; ariaLabel?: string }>;
    }>;
  };
  componentsCta: {
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
    note: string;
  };
  contact: {
    email: string;
    githubUrl: string;
  };
};

const SHARED_PROOF = ["tr / de / en / ar", "100% in your browser", "open source ready"];

export const content: Record<Locale, SiteContent> = {
  tr: {
    meta: {
      title: "Wiener's Tools — Tarayıcıda görsel atölyesi",
      description:
        "32 araç, 4 dil, %100 tarayıcıda. Sıkıştır, dönüştür, yeniden boyutlandır, pixelart üret, palet çıkart — fotoğrafların asla sunucumuza gitmez."
    },
    hero: {
      eyebrow: "Tarayıcıda görsel atölyesi",
      title: "wieners-tools",
      subtitle:
        "Görselleri sıkıştırın, dönüştürün, düzenleyin ve üretin. Hepsi tarayıcınızda — fotoğraflarınız asla sunucumuza gitmez.",
      primaryCta: "Araçları gör",
      secondaryCta: "Hakkında",
      proof: SHARED_PROOF,
      typewriter: ["sıkıştır.", "dönüştür.", "düzenle.", "üret."]
    },
    toolsSection: {
      eyebrow: "Araçlar",
      title: "32 araç, 6 kategori, sıfır yükleme.",
      intro:
        "Hiçbir görsel sunucumuza ulaşmaz. Tüm sıkıştırma, dönüştürme ve AI işleri WebAssembly ile cihazınızda çalışır.",
      statusReady: "Hazır",
      statusBeta: "Beta",
      statusSoon: "Yakında",
      badgeAi: "AI",
      badgeBeta: "Beta",
      badgeNew: "Yeni",
      badgeFast: "Hızlı",
      badgeClientSide: "Client-side"
    },
    about: {
      title: "Wiener's Tools nedir?",
      intro:
        "Wiener's Tools, görsellerle uğraşan herkesin tek tek doğru aracı bulmak için 12 farklı siteye gitmek zorunda kalmaması için yapıldı. Hepsi tarayıcıda, hepsi tek yerde, fotoğrafınız hiç sunucumuza ulaşmadan.",
      sections: [
        {
          title: "Tarayıcı tek başına yeter",
          body:
            "Modern tarayıcılar artık bir önceki nesil sunucu kadar güçlü. Sıkıştırma, format dönüştürme, hatta arkaplan kaldırma — hepsi WebAssembly ve WebGPU ile cihazınızda çalışıyor. Fotoğrafınızı bizim sunucumuza yüklemek için bir nedenimiz yok."
        },
        {
          title: "Açık ve denetlenebilir",
          body:
            "Kod açık. Network sekmesini açıp her aracın gerçekten hiçbir görsel yüklemediğini kendiniz görebilirsiniz."
        },
        {
          title: "Wiener Labs",
          body:
            "Wiener's Tools, Wiener Labs (Web3 altyapı laboratuvarı) tarafından sürdürülen ücretsiz bir araç koleksiyonudur. Telif hakkı, kayıt veya abonelik yoktur."
        }
      ],
      ctaLabel: "GitHub'da incele",
      ctaUrl: "https://github.com/wienerlabs/wieners-tools"
    },
    feedback: {
      title: "Geri bildirim",
      intro:
        "Bir araç istediğiniz gibi çalışmıyor mu? Yeni bir araç önerisi mi var? Tek tıkla yazın.",
      mailLabel: "E-posta gönder",
      githubLabel: "GitHub Issue aç",
      note: "Form yok, kayıt yok. Doğrudan e-posta veya GitHub."
    },
    errorPages: {
      notFoundTitle: "Bu sayfa bulunamadı",
      notFoundText: "Aradığınız araç mevcut listede değil. Galeri sayfasından devam edin.",
      backHome: "Ana sayfaya dön"
    },
    workbench: {
      dropTitle: "Dosyayı buraya bırakın",
      dropHint: "veya tıklayıp seçin. Yapıştır da çalışır (⌘V / Ctrl+V).",
      dropOr: "veya",
      pickFile: "Dosya seç",
      paste: "Yapıştır",
      process: "İşle",
      processing: "İşleniyor…",
      download: "İndir",
      downloadAll: "Hepsini indir",
      reset: "Sıfırla",
      addMore: "Daha ekle",
      files: "dosya",
      file: "dosya",
      soonTitle: "Bu araç yakında geliyor",
      soonText:
        "Foundation hazır, implementasyon önümüzdeki sürümlerde. GitHub'dan ilerlemeyi takip edebilirsiniz.",
      privacyNote: "Görselleriniz sunucumuza gönderilmez. Tüm işleme tarayıcınızda gerçekleşir."
    },
    fallingHero: {
      eyebrow: "Hakkımızda",
      text: "Wiener Tools tarayıcınızda çalışan bir görsel atölyesidir. 32 araç altı kategoride toplandı. Hiçbir foto sunucumuza ulaşmaz çünkü hepsi cihazınızda çalışır. Sıkıştır dönüştür düzenle üret hepsi tek yerde.",
      highlightWords: ["Wiener", "Tools", "tarayıcınızda", "atölyesidir", "32", "altı", "sunucumuza", "cihazınızda", "tek"],
      hint: "Üzerine gelince yere düşer."
    },
    gallery: {
      nav: "Komponentler",
      eyebrow: "İç araç · Frontend",
      title: "Komponent galerisi",
      intro: "Wiener şirketindeki frontend ekibi için canlı önizleme + kod. Tüm bileşenler bizim tasarım sisteminde, monokrom palette ve Host Grotesk tipografi ile.",
      previewLabel: "Canlı önizleme",
      codeLabel: "Kullanım",
      audience: "Yalnızca Wiener Labs ekipleri için referans katalog."
    },
    cardNav: {
      menuLabel: "Menü",
      closeLabel: "Kapat",
      ctaLabel: "Komponentler",
      items: [
        {
          label: "Araçlar",
          links: [
            { label: "Tüm araçlar", href: "/tr/#tools" },
            { label: "Sıkıştırma", href: "/tr/#compression" },
            { label: "AI", href: "/tr/#ai" },
            { label: "PDF", href: "/tr/#pdf" },
            { label: "Tasarım", href: "/tr/#design" },
            { label: "Geliştirici", href: "/tr/#developer" }
          ]
        },
        {
          label: "Komponentler",
          links: [
            { label: "Galeri", href: "/tr/components/" },
            { label: "GitHub", href: "https://github.com/wienerlabs/wieners-tools", ariaLabel: "Wiener Tools GitHub" }
          ]
        },
        {
          label: "Stüdyo",
          links: [
            { label: "Hakkında", href: "/tr/about/" },
            { label: "Geri bildirim", href: "/tr/feedback/" },
            { label: "E-posta", href: "mailto:baturalp@wienerlabs.com", ariaLabel: "Wiener Labs e-postası" }
          ]
        }
      ]
    },
    componentsCta: {
      eyebrow: "İç kullanım · Yeni",
      title: "Frontend ekibi için komponent galerisi",
      body: "PixelBlast, TypewriterTitle, MagnetLines, Cubes, FallingText ve CodeBlock — hepsi monokrom palette canlı önizleme ve kopyala-yapıştır kod ile.",
      ctaLabel: "Galeriyi aç",
      note: "6 komponent · canlı önizleme · TypeScript snippet"
    },
    contact: {
      email: "baturalp@wienerlabs.com",
      githubUrl: "https://github.com/wienerlabs/wieners-tools"
    }
  },
  en: {
    meta: {
      title: "Wiener's Tools — The browser-native image workshop",
      description:
        "32 tools, 4 languages, 100% in your browser. Compress, convert, resize, pixelate, extract palettes — your photos never leave your device."
    },
    hero: {
      eyebrow: "The browser-native image workshop",
      title: "wieners-tools",
      subtitle:
        "Compress, convert, edit and generate images. Everything in your browser — your photos never reach our servers.",
      primaryCta: "Browse tools",
      secondaryCta: "About",
      proof: SHARED_PROOF,
      typewriter: ["compress.", "convert.", "edit.", "generate."]
    },
    toolsSection: {
      eyebrow: "Tools",
      title: "32 tools, 6 categories, zero uploads.",
      intro:
        "No image leaves your device. Compression, conversion and AI all run on your machine via WebAssembly.",
      statusReady: "Ready",
      statusBeta: "Beta",
      statusSoon: "Soon",
      badgeAi: "AI",
      badgeBeta: "Beta",
      badgeNew: "New",
      badgeFast: "Fast",
      badgeClientSide: "Client-side"
    },
    about: {
      title: "What is Wiener's Tools?",
      intro:
        "Wiener's Tools exists so anyone working with images doesn't have to bounce between 12 different ad-laden sites to find the right tool. Everything in the browser, in one place, with your photos never touching a server.",
      sections: [
        {
          title: "Your browser is enough",
          body:
            "Modern browsers are as powerful as last-generation servers. Compression, format conversion, even background removal — all run on-device via WebAssembly and WebGPU. There is no reason to upload your photo to us."
        },
        {
          title: "Open and verifiable",
          body:
            "The code is open. Open your DevTools network tab and confirm yourself that no image is ever uploaded."
        },
        {
          title: "By Wiener Labs",
          body:
            "Wiener's Tools is a free toolkit maintained by Wiener Labs (a Web3 infrastructure lab). No paywall, no signup, no subscription."
        }
      ],
      ctaLabel: "Browse on GitHub",
      ctaUrl: "https://github.com/wienerlabs/wieners-tools"
    },
    feedback: {
      title: "Feedback",
      intro:
        "A tool not working as expected? Want a new tool added? Reach out in one click.",
      mailLabel: "Send email",
      githubLabel: "Open a GitHub issue",
      note: "No form, no signup. Direct email or GitHub."
    },
    errorPages: {
      notFoundTitle: "Page not found",
      notFoundText: "The tool you were looking for isn't in the catalog. Head back to the gallery.",
      backHome: "Back to home"
    },
    workbench: {
      dropTitle: "Drop your file here",
      dropHint: "or click to choose. Paste also works (⌘V / Ctrl+V).",
      dropOr: "or",
      pickFile: "Pick file",
      paste: "Paste",
      process: "Process",
      processing: "Processing…",
      download: "Download",
      downloadAll: "Download all",
      reset: "Reset",
      addMore: "Add more",
      files: "files",
      file: "file",
      soonTitle: "This tool is coming soon",
      soonText:
        "The foundation is ready, implementation lands in upcoming releases. Track progress on GitHub.",
      privacyNote: "Your files never reach our servers. All processing happens in your browser."
    },
    fallingHero: {
      eyebrow: "About",
      text: "Wiener Tools is a browser-native image workshop. Thirty-two tools spread across six categories. No file ever reaches our servers because everything runs on your device. Compress convert edit generate all in one place.",
      highlightWords: ["Wiener", "Tools", "browser-native", "workshop", "Thirty-two", "six", "servers", "device", "one"],
      hint: "Hover to drop."
    },
    gallery: {
      nav: "Components",
      eyebrow: "Internal · Frontend",
      title: "Component gallery",
      intro: "Live previews and copy-paste snippets for the Wiener frontend team. Every component lives inside our monochrome palette and Host Grotesk type system.",
      previewLabel: "Live preview",
      codeLabel: "Usage",
      audience: "Reference catalog for Wiener Labs teams."
    },
    cardNav: {
      menuLabel: "Menu",
      closeLabel: "Close",
      ctaLabel: "Components",
      items: [
        {
          label: "Tools",
          links: [
            { label: "All tools", href: "/en/#tools" },
            { label: "Compression", href: "/en/#compression" },
            { label: "AI", href: "/en/#ai" },
            { label: "PDF", href: "/en/#pdf" },
            { label: "Design", href: "/en/#design" },
            { label: "Developer", href: "/en/#developer" }
          ]
        },
        {
          label: "Components",
          links: [
            { label: "Gallery", href: "/en/components/" },
            { label: "GitHub", href: "https://github.com/wienerlabs/wieners-tools", ariaLabel: "Wiener Tools on GitHub" }
          ]
        },
        {
          label: "Studio",
          links: [
            { label: "About", href: "/en/about/" },
            { label: "Feedback", href: "/en/feedback/" },
            { label: "Email", href: "mailto:baturalp@wienerlabs.com", ariaLabel: "Email Wiener Labs" }
          ]
        }
      ]
    },
    componentsCta: {
      eyebrow: "Internal · New",
      title: "Component gallery for the frontend team",
      body: "PixelBlast, TypewriterTitle, MagnetLines, Cubes, FallingText and CodeBlock — all in our monochrome palette with live previews and copy-paste code.",
      ctaLabel: "Open gallery",
      note: "6 components · live previews · TypeScript snippets"
    },
    contact: {
      email: "baturalp@wienerlabs.com",
      githubUrl: "https://github.com/wienerlabs/wieners-tools"
    }
  },
  de: {
    meta: {
      title: "Wiener's Tools — Bildwerkstatt im Browser",
      description:
        "32 Werkzeuge, 4 Sprachen, 100% im Browser. Komprimieren, konvertieren, skalieren, pixelisieren — Ihre Fotos verlassen Ihr Gerät nicht."
    },
    hero: {
      eyebrow: "Bildwerkstatt im Browser",
      title: "wieners-tools",
      subtitle:
        "Bilder komprimieren, konvertieren, bearbeiten und erzeugen — komplett im Browser, ohne Upload.",
      primaryCta: "Werkzeuge",
      secondaryCta: "Über",
      proof: SHARED_PROOF,
      typewriter: ["komprimieren.", "konvertieren.", "bearbeiten.", "erzeugen."]
    },
    toolsSection: {
      eyebrow: "Werkzeuge",
      title: "32 Werkzeuge, 6 Kategorien, kein Upload.",
      intro:
        "Kein Bild verlässt Ihr Gerät. Komprimierung, Konvertierung und KI laufen über WebAssembly lokal.",
      statusReady: "Bereit",
      statusBeta: "Beta",
      statusSoon: "Bald",
      badgeAi: "KI",
      badgeBeta: "Beta",
      badgeNew: "Neu",
      badgeFast: "Schnell",
      badgeClientSide: "Client-side"
    },
    about: {
      title: "Was ist Wiener's Tools?",
      intro:
        "Wiener's Tools wurde gebaut, damit niemand mehr zwischen 12 werbeüberladenen Seiten springen muss, um das richtige Bildwerkzeug zu finden. Alles im Browser, an einem Ort, ohne dass Fotos jemals einen Server berühren.",
      sections: [
        {
          title: "Der Browser reicht",
          body:
            "Moderne Browser sind so leistungsstark wie Server der letzten Generation. Komprimierung, Formatkonvertierung, sogar Hintergrundentfernung — alles läuft lokal über WebAssembly und WebGPU."
        },
        {
          title: "Offen und nachvollziehbar",
          body:
            "Der Code ist offen. Im Network-Tab Ihrer Entwicklertools können Sie selbst sehen, dass kein Bild hochgeladen wird."
        },
        {
          title: "Von Wiener Labs",
          body:
            "Wiener's Tools ist ein kostenloses Toolkit von Wiener Labs (Web3-Infrastruktur-Lab). Keine Paywall, keine Registrierung."
        }
      ],
      ctaLabel: "Auf GitHub ansehen",
      ctaUrl: "https://github.com/wienerlabs/wieners-tools"
    },
    feedback: {
      title: "Feedback",
      intro:
        "Funktioniert ein Werkzeug nicht wie erwartet? Wunschwerkzeug? Ein Klick.",
      mailLabel: "E-Mail senden",
      githubLabel: "GitHub-Issue öffnen",
      note: "Kein Formular, keine Anmeldung."
    },
    errorPages: {
      notFoundTitle: "Seite nicht gefunden",
      notFoundText: "Dieses Werkzeug ist nicht im Katalog. Zurück zur Galerie.",
      backHome: "Zur Startseite"
    },
    workbench: {
      dropTitle: "Datei hier ablegen",
      dropHint: "oder klicken zum Auswählen. Einfügen funktioniert ebenfalls (⌘V / Strg+V).",
      dropOr: "oder",
      pickFile: "Datei wählen",
      paste: "Einfügen",
      process: "Verarbeiten",
      processing: "Wird verarbeitet…",
      download: "Herunterladen",
      downloadAll: "Alle herunterladen",
      reset: "Zurücksetzen",
      addMore: "Hinzufügen",
      files: "Dateien",
      file: "Datei",
      soonTitle: "Dieses Werkzeug kommt bald",
      soonText:
        "Die Grundlage steht, die Umsetzung folgt in einer kommenden Version. Fortschritt auf GitHub.",
      privacyNote: "Ihre Dateien erreichen unsere Server nicht. Alle Verarbeitung erfolgt im Browser."
    },
    fallingHero: {
      eyebrow: "Über uns",
      text: "Wiener Tools ist eine Bildwerkstatt im Browser. Zweiunddreißig Werkzeuge in sechs Kategorien. Keine Datei erreicht unsere Server denn alles läuft auf Ihrem Gerät. Komprimieren konvertieren bearbeiten erzeugen alles an einem Ort.",
      highlightWords: ["Wiener", "Tools", "Browser", "Bildwerkstatt", "Zweiunddreißig", "sechs", "Server", "Gerät", "einem"],
      hint: "Hover lässt es fallen."
    },
    gallery: {
      nav: "Komponenten",
      eyebrow: "Intern · Frontend",
      title: "Komponentengalerie",
      intro: "Live-Vorschauen und Code-Snippets für das Wiener Frontend-Team. Alle Komponenten in unserer monochromen Palette und Host Grotesk Typografie.",
      previewLabel: "Live-Vorschau",
      codeLabel: "Verwendung",
      audience: "Referenz-Katalog für Wiener Labs Teams."
    },
    cardNav: {
      menuLabel: "Menü",
      closeLabel: "Schließen",
      ctaLabel: "Komponenten",
      items: [
        {
          label: "Werkzeuge",
          links: [
            { label: "Alle Werkzeuge", href: "/de/#tools" },
            { label: "Komprimierung", href: "/de/#compression" },
            { label: "KI", href: "/de/#ai" },
            { label: "PDF", href: "/de/#pdf" },
            { label: "Design", href: "/de/#design" },
            { label: "Entwickler", href: "/de/#developer" }
          ]
        },
        {
          label: "Komponenten",
          links: [
            { label: "Galerie", href: "/de/components/" },
            { label: "GitHub", href: "https://github.com/wienerlabs/wieners-tools", ariaLabel: "Wiener Tools auf GitHub" }
          ]
        },
        {
          label: "Studio",
          links: [
            { label: "Über", href: "/de/about/" },
            { label: "Feedback", href: "/de/feedback/" },
            { label: "E-Mail", href: "mailto:baturalp@wienerlabs.com", ariaLabel: "Wiener Labs E-Mail" }
          ]
        }
      ]
    },
    componentsCta: {
      eyebrow: "Intern · Neu",
      title: "Komponentengalerie für das Frontend-Team",
      body: "PixelBlast, TypewriterTitle, MagnetLines, Cubes, FallingText und CodeBlock — alles in unserer monochromen Palette mit Live-Vorschauen und Code zum Kopieren.",
      ctaLabel: "Galerie öffnen",
      note: "6 Komponenten · Live-Vorschauen · TypeScript-Snippets"
    },
    contact: {
      email: "baturalp@wienerlabs.com",
      githubUrl: "https://github.com/wienerlabs/wieners-tools"
    }
  },
  ar: {
    meta: {
      title: "Wiener's Tools — ورشة الصور داخل المتصفح",
      description:
        "32 أداة و4 لغات و100% داخل المتصفح. اضغط، حوّل، غيّر الحجم، أنشئ بكسل آرت — صورك لا تغادر جهازك."
    },
    hero: {
      eyebrow: "ورشة الصور داخل المتصفح",
      title: "wieners-tools",
      subtitle:
        "اضغط، حوّل، عدّل، وأنشئ — كل ذلك داخل متصفحك. صورك لا تصل إلى خوادمنا أبداً.",
      primaryCta: "تصفح الأدوات",
      secondaryCta: "حول",
      proof: SHARED_PROOF,
      typewriter: ["اضغط.", "حوّل.", "عدّل.", "أنتج."]
    },
    toolsSection: {
      eyebrow: "الأدوات",
      title: "32 أداة، 6 فئات، صفر رفع.",
      intro:
        "لا صورة تغادر جهازك. الضغط والتحويل والذكاء الاصطناعي كلها تعمل محلياً عبر WebAssembly.",
      statusReady: "جاهز",
      statusBeta: "تجريبي",
      statusSoon: "قريباً",
      badgeAi: "ذكاء",
      badgeBeta: "تجريبي",
      badgeNew: "جديد",
      badgeFast: "سريع",
      badgeClientSide: "في المتصفح"
    },
    about: {
      title: "ما هو Wiener's Tools؟",
      intro:
        "أُنشئت Wiener's Tools حتى لا يضطر أي شخص يتعامل مع الصور إلى التنقل بين 12 موقعاً مليئاً بالإعلانات. كل شيء داخل المتصفح، في مكان واحد، مع ضمان أن صورك لا تلامس أي خادم.",
      sections: [
        {
          title: "متصفحك كافٍ",
          body:
            "المتصفحات الحديثة بقوة خوادم الجيل السابق. الضغط والتحويل وحتى إزالة الخلفية كلها تعمل محلياً عبر WebAssembly وWebGPU."
        },
        {
          title: "مفتوح وقابل للتحقق",
          body:
            "الكود مفتوح. افتح علامة Network في أدوات المطور وتحقق بنفسك أن أي صورة لا تُرفع."
        },
        {
          title: "من Wiener Labs",
          body:
            "Wiener's Tools حزمة أدوات مجانية تديرها Wiener Labs (مختبر بنية تحتية Web3). دون حواجز ودون تسجيل ودون اشتراكات."
        }
      ],
      ctaLabel: "تصفّح على GitHub",
      ctaUrl: "https://github.com/wienerlabs/wieners-tools"
    },
    feedback: {
      title: "تعليقات",
      intro:
        "هل لا تعمل أداة كما تتوقع؟ تريد إضافة أداة؟ بنقرة واحدة.",
      mailLabel: "إرسال بريد",
      githubLabel: "فتح Issue على GitHub",
      note: "بدون نموذج وبدون تسجيل."
    },
    errorPages: {
      notFoundTitle: "الصفحة غير موجودة",
      notFoundText: "هذه الأداة ليست في القائمة. عُد إلى المعرض.",
      backHome: "العودة للرئيسية"
    },
    workbench: {
      dropTitle: "أفلت ملفك هنا",
      dropHint: "أو انقر للاختيار. اللصق يعمل أيضاً (⌘V / Ctrl+V).",
      dropOr: "أو",
      pickFile: "اختيار ملف",
      paste: "لصق",
      process: "تشغيل",
      processing: "جارٍ المعالجة…",
      download: "تنزيل",
      downloadAll: "تنزيل الكل",
      reset: "إعادة",
      addMore: "إضافة",
      files: "ملفات",
      file: "ملف",
      soonTitle: "هذه الأداة قريباً",
      soonText:
        "الأساس جاهز، التنفيذ في إصدارات قادمة. تابع التقدم على GitHub.",
      privacyNote: "ملفاتك لا تصل إلى خوادمنا. كل المعالجة تتم في متصفحك."
    },
    fallingHero: {
      eyebrow: "حول",
      text: "Wiener Tools ورشة صور تعمل داخل المتصفح. اثنتان وثلاثون أداة موزعة على ست فئات. لا ملف يصل إلى خوادمنا لأن كل شيء يعمل على جهازك. اضغط حوّل عدّل أنتج كله في مكان واحد.",
      highlightWords: ["Wiener", "Tools", "المتصفح", "ورشة", "وثلاثون", "ست", "خوادمنا", "جهازك", "واحد"],
      hint: "مرر فوقها لتسقط."
    },
    gallery: {
      nav: "المكونات",
      eyebrow: "داخلي · Frontend",
      title: "معرض المكونات",
      intro: "معاينات حية ومقتطفات للنسخ من فريق Wiener للواجهة. كل المكونات تتبع لوحتنا أحادية اللون وخط Host Grotesk.",
      previewLabel: "معاينة حية",
      codeLabel: "الاستخدام",
      audience: "كتالوج مرجعي لفرق Wiener Labs."
    },
    cardNav: {
      menuLabel: "القائمة",
      closeLabel: "إغلاق",
      ctaLabel: "المكونات",
      items: [
        {
          label: "الأدوات",
          links: [
            { label: "كل الأدوات", href: "/ar/#tools" },
            { label: "الضغط", href: "/ar/#compression" },
            { label: "الذكاء الاصطناعي", href: "/ar/#ai" },
            { label: "PDF", href: "/ar/#pdf" },
            { label: "التصميم", href: "/ar/#design" },
            { label: "المطورون", href: "/ar/#developer" }
          ]
        },
        {
          label: "المكونات",
          links: [
            { label: "المعرض", href: "/ar/components/" },
            { label: "GitHub", href: "https://github.com/wienerlabs/wieners-tools", ariaLabel: "Wiener Tools على GitHub" }
          ]
        },
        {
          label: "الاستوديو",
          links: [
            { label: "حول", href: "/ar/about/" },
            { label: "تعليقات", href: "/ar/feedback/" },
            { label: "البريد الإلكتروني", href: "mailto:baturalp@wienerlabs.com", ariaLabel: "بريد Wiener Labs" }
          ]
        }
      ]
    },
    componentsCta: {
      eyebrow: "داخلي · جديد",
      title: "معرض المكونات لفريق الواجهة",
      body: "PixelBlast وTypewriterTitle وMagnetLines وCubes وFallingText وCodeBlock — جميعها بلوحتنا أحادية اللون مع معاينات حية وكود قابل للنسخ.",
      ctaLabel: "افتح المعرض",
      note: "6 مكونات · معاينات حية · مقتطفات TypeScript"
    },
    contact: {
      email: "baturalp@wienerlabs.com",
      githubUrl: "https://github.com/wienerlabs/wieners-tools"
    }
  }
};
