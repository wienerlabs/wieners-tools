import type { Locale } from "@/lib/i18n";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalDocument = {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

type CookieBannerCopy = {
  title: string;
  text: string;
  acceptAll: string;
  necessaryOnly: string;
  learnMore: string;
};

type LegalUi = {
  footerGroup: string;
  privacyLabel: string;
  cookieLabel: string;
  privacy: LegalDocument;
  cookies: LegalDocument;
  banner: CookieBannerCopy;
};

const tr: LegalUi = {
  footerGroup: "Yasal",
  privacyLabel: "Gizlilik",
  cookieLabel: "Çerezler",
  banner: {
    title: "Çerez tercihleri",
    text: "Bu sürümde yalnızca tercihlerinizi hatırlamak için zorunlu yerel depolama kullanılır. Hiçbir izleme/analitik araç yüklü değildir.",
    acceptAll: "Tamam",
    necessaryOnly: "Sadece gerekli",
    learnMore: "Çerez politikasını aç"
  },
  privacy: {
    title: "Gizlilik bildirimi",
    description:
      "Wiener's Tools tüm görsel/PDF işlemlerini cihazınızda yapar. Bu sayfa, hangi minimum verilerin işlenebileceğini açıklar.",
    updatedAt: "1 Mayıs 2026",
    sections: [
      {
        title: "Sunucuya hiçbir görsel gitmez",
        paragraphs: [
          "Yüklediğiniz görseller, PDF'ler veya yapıştırdığınız metinler tarayıcınızdan dışarı çıkmaz. İşleme tamamen cihazınızda WebAssembly + WebGPU + Web Worker'lar üzerinden yapılır."
        ]
      },
      {
        title: "İşlenebilecek minimum veri",
        bullets: [
          "Tercih kaydı: çerez bannerı seçimi (`wieners_tools_cookie_choice_v1`)",
          "Teknik istek logları: barındırma sağlayıcısı (Cloudflare) tarafında IP/zaman/user-agent — güvenlik amaçlı, kısa süreli",
          "AI modeli cache: ilk kullanımda model dosyaları Cache Storage'a indirilir; bu dosyalar harici CDN'den (HuggingFace) gelir"
        ]
      },
      {
        title: "Üçüncü taraf hizmetleri",
        paragraphs: [
          "Site Cloudflare Pages üzerinde yayınlanır. AI araçları çalıştırıldığında tek seferlik model dosyaları HuggingFace CDN'inden indirilir.",
          "Site içine Google Analytics, Tag Manager, Meta Pixel, Hotjar veya benzeri ziyaretçi izleme araçları gömülü değildir."
        ]
      },
      {
        title: "İletişim ve haklar",
        paragraphs: [
          "Verilerinizle ilgili soru veya talepleriniz için hello@wienerlabs.xyz adresine e-posta atabilirsiniz. KVKK ve GDPR kapsamındaki temel haklarınız (erişim, düzeltme, silme, itiraz) saklıdır."
        ]
      }
    ]
  },
  cookies: {
    title: "Çerez politikası",
    description: "Sitede yalnızca tercihinizi hatırlamak için bir tane yerel depolama kaydı vardır.",
    updatedAt: "1 Mayıs 2026",
    sections: [
      {
        title: "Aktif olan kayıtlar",
        bullets: [
          "`wieners_tools_cookie_choice_v1` — çerez bannerı seçiminiz",
          "AI araçlarında: model dosyalarını saklayan Cache Storage girdileri (yalnızca o aracı kullandıysanız)"
        ]
      },
      {
        title: "Aktif olmayanlar",
        paragraphs: [
          "Google Analytics, Ads, Tag Manager, Meta Pixel, Hotjar, Clarity veya benzeri izleme araçları yoktur. Reklam çerezi yoktur."
        ]
      },
      {
        title: "Yönetim",
        paragraphs: [
          "Tercihinizi banner üzerinden değiştirebilir, tarayıcı ayarlarından depolamayı temizleyebilirsiniz."
        ]
      }
    ]
  }
};

const en: LegalUi = {
  footerGroup: "Legal",
  privacyLabel: "Privacy",
  cookieLabel: "Cookies",
  banner: {
    title: "Cookie preferences",
    text: "This site only stores a single local preference entry. No analytics, ads or tracking are loaded.",
    acceptAll: "OK",
    necessaryOnly: "Necessary only",
    learnMore: "Open cookie policy"
  },
  privacy: {
    title: "Privacy notice",
    description:
      "Wiener's Tools performs all image/PDF processing on your device. This page explains the minimum data that may be processed.",
    updatedAt: "May 1, 2026",
    sections: [
      {
        title: "No image leaves your browser",
        paragraphs: [
          "Files you drop, paste, or pick never leave your device. All processing happens locally via WebAssembly, WebGPU and Web Workers."
        ]
      },
      {
        title: "Minimum data that may be processed",
        bullets: [
          "Preference: cookie banner choice (`wieners_tools_cookie_choice_v1`)",
          "Hosting logs: Cloudflare may retain IP/time/user-agent for security; short retention",
          "AI model cache: model weights downloaded to Cache Storage from external CDN (HuggingFace)"
        ]
      },
      {
        title: "Third parties",
        paragraphs: [
          "Site is hosted on Cloudflare Pages. When you use an AI tool, a one-time model download is fetched from HuggingFace CDN.",
          "No Google Analytics, Tag Manager, Meta Pixel, Hotjar or comparable trackers are embedded."
        ]
      },
      {
        title: "Contact and rights",
        paragraphs: [
          "Reach out at hello@wienerlabs.xyz for any privacy question. Your GDPR/KVKK rights (access, rectification, erasure, objection) remain in effect."
        ]
      }
    ]
  },
  cookies: {
    title: "Cookie policy",
    description: "Only a single local preference entry is stored.",
    updatedAt: "May 1, 2026",
    sections: [
      {
        title: "Active storage",
        bullets: [
          "`wieners_tools_cookie_choice_v1` — your banner choice",
          "AI tools: Cache Storage entries that hold model weights (only if you used the tool)"
        ]
      },
      {
        title: "Not active",
        paragraphs: [
          "No Google Analytics, Ads, Tag Manager, Meta Pixel, Hotjar, Clarity or similar trackers. No advertising cookies."
        ]
      },
      {
        title: "Manage",
        paragraphs: [
          "Reset your choice via the banner; you can also clear site data from your browser settings."
        ]
      }
    ]
  }
};

const de: LegalUi = {
  footerGroup: "Rechtliches",
  privacyLabel: "Datenschutz",
  cookieLabel: "Cookies",
  banner: {
    title: "Cookie-Einstellungen",
    text: "Es wird nur ein lokaler Eintrag für Ihre Präferenz gespeichert. Keine Analytics, keine Werbung, kein Tracking.",
    acceptAll: "OK",
    necessaryOnly: "Nur notwendige",
    learnMore: "Cookie-Richtlinie öffnen"
  },
  privacy: {
    title: "Datenschutzhinweis",
    description:
      "Wiener's Tools führt alle Bild-/PDF-Operationen auf Ihrem Gerät aus. Diese Seite beschreibt die minimal verarbeiteten Daten.",
    updatedAt: "1. Mai 2026",
    sections: [
      {
        title: "Kein Bild verlässt Ihren Browser",
        paragraphs: [
          "Dateien, die Sie ablegen, einfügen oder auswählen, verlassen Ihr Gerät nicht. Die Verarbeitung erfolgt lokal über WebAssembly, WebGPU und Web Worker."
        ]
      },
      {
        title: "Minimal verarbeitete Daten",
        bullets: [
          "Präferenz: Cookie-Banner-Auswahl (`wieners_tools_cookie_choice_v1`)",
          "Hosting-Logs: Cloudflare kann IP/Zeit/User-Agent kurzzeitig speichern (Sicherheit)",
          "KI-Modell-Cache: Modellgewichte werden in Cache Storage gespeichert (Quelle: HuggingFace CDN)"
        ]
      },
      {
        title: "Dritte",
        paragraphs: [
          "Hosting via Cloudflare Pages. KI-Werkzeuge laden einmalig Modelldateien von HuggingFace CDN.",
          "Kein Google Analytics, Tag Manager, Meta Pixel, Hotjar oder vergleichbare Tracker."
        ]
      },
      {
        title: "Kontakt und Rechte",
        paragraphs: [
          "Datenschutzfragen an hello@wienerlabs.xyz. Ihre Rechte nach DSGVO/KVKK (Auskunft, Berichtigung, Löschung, Widerspruch) bestehen weiterhin."
        ]
      }
    ]
  },
  cookies: {
    title: "Cookie-Richtlinie",
    description: "Es wird nur ein lokaler Präferenz-Eintrag gespeichert.",
    updatedAt: "1. Mai 2026",
    sections: [
      {
        title: "Aktive Speicherung",
        bullets: [
          "`wieners_tools_cookie_choice_v1` — Ihre Banner-Auswahl",
          "KI-Werkzeuge: Cache-Storage-Einträge mit Modelldateien (nur wenn benutzt)"
        ]
      },
      {
        title: "Nicht aktiv",
        paragraphs: [
          "Kein Google Analytics, Ads, Tag Manager, Meta Pixel, Hotjar oder ähnliche Tracker. Keine Werbe-Cookies."
        ]
      },
      {
        title: "Verwaltung",
        paragraphs: [
          "Auswahl per Banner zurücksetzen; Site-Daten in den Browser-Einstellungen löschbar."
        ]
      }
    ]
  }
};

const ar: LegalUi = {
  footerGroup: "قانوني",
  privacyLabel: "الخصوصية",
  cookieLabel: "ملفات الارتباط",
  banner: {
    title: "تفضيلات ملفات الارتباط",
    text: "يخزّن الموقع تفضيلاً محلياً واحداً فقط. لا تحليلات ولا إعلانات ولا تتبع.",
    acceptAll: "حسناً",
    necessaryOnly: "الضرورية فقط",
    learnMore: "فتح السياسة"
  },
  privacy: {
    title: "إشعار الخصوصية",
    description:
      "Wiener's Tools يعالج كل عمليات الصور/PDF داخل جهازك. توضّح هذه الصفحة الحد الأدنى من البيانات.",
    updatedAt: "1 مايو 2026",
    sections: [
      {
        title: "لا صورة تغادر متصفحك",
        paragraphs: [
          "الملفات التي تُسقطها أو تلصقها أو تختارها لا تغادر جهازك. تتم المعالجة محلياً عبر WebAssembly وWebGPU وWeb Workers."
        ]
      },
      {
        title: "الحد الأدنى من البيانات",
        bullets: [
          "تفضيل: اختيار شريط ملفات الارتباط (`wieners_tools_cookie_choice_v1`)",
          "سجلات استضافة: قد تحتفظ Cloudflare بـ IP/الوقت/معلومات المتصفح لفترة قصيرة (للأمان)",
          "ذاكرة نموذج الذكاء الاصطناعي: تحفظ Cache Storage ملفات النموذج (مصدر: HuggingFace CDN)"
        ]
      },
      {
        title: "أطراف خارجية",
        paragraphs: [
          "الاستضافة عبر Cloudflare Pages. أدوات الذكاء الاصطناعي تنزّل ملفات النماذج لمرة واحدة من HuggingFace CDN.",
          "لا Google Analytics ولا Tag Manager ولا Meta Pixel ولا Hotjar أو ما شابه."
        ]
      },
      {
        title: "التواصل والحقوق",
        paragraphs: [
          "للأسئلة: hello@wienerlabs.xyz. حقوقك بموجب GDPR/KVKK (الوصول، التصحيح، الحذف، الاعتراض) محفوظة."
        ]
      }
    ]
  },
  cookies: {
    title: "سياسة ملفات الارتباط",
    description: "يُخزَّن إدخال تفضيل واحد محلياً فقط.",
    updatedAt: "1 مايو 2026",
    sections: [
      {
        title: "التخزين النشط",
        bullets: [
          "`wieners_tools_cookie_choice_v1` — اختيارك في الشريط",
          "أدوات الذكاء الاصطناعي: مدخلات Cache Storage تحتفظ بأوزان النماذج (فقط عند الاستخدام)"
        ]
      },
      {
        title: "غير النشط",
        paragraphs: [
          "لا Google Analytics ولا Ads ولا Tag Manager ولا Meta Pixel ولا Hotjar أو ما شابه. لا ملفات ارتباط إعلانية."
        ]
      },
      {
        title: "الإدارة",
        paragraphs: [
          "أعد ضبط اختيارك عبر الشريط؛ يمكنك مسح بيانات الموقع من إعدادات المتصفح."
        ]
      }
    ]
  }
};

export const legalContent: Record<Locale, LegalUi> = { tr, en, de, ar };

export function getLegalLinks(locale: Locale) {
  const ui = legalContent[locale];
  return {
    title: ui.footerGroup,
    items: [
      { label: ui.privacyLabel, href: `/${locale}/privacy-policy/` },
      { label: ui.cookieLabel, href: `/${locale}/cookie-policy/` }
    ]
  };
}
