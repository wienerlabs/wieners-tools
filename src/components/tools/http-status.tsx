"use client";

import { useMemo, useState } from "react";
import { TextInput } from "@/components/options-panel";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";

type Entry = { code: number; name: string; desc: string };

const STATUS: Entry[] = [
  // 1xx
  { code: 100, name: "Continue", desc: "İstek başlığı kabul edildi, gövde gönderilebilir." },
  { code: 101, name: "Switching Protocols", desc: "Sunucu protokol değişikliği talebine uydu." },
  { code: 102, name: "Processing", desc: "İstek alındı, işleniyor (WebDAV)." },
  { code: 103, name: "Early Hints", desc: "Final yanıttan önce ipucu header'ları (preload vb.)." },

  // 2xx
  { code: 200, name: "OK", desc: "Standart başarılı yanıt." },
  { code: 201, name: "Created", desc: "Yeni kaynak oluşturuldu; konumu Location header'ında." },
  { code: 202, name: "Accepted", desc: "İstek kuyruğa alındı, asenkron işlenecek." },
  { code: 203, name: "Non-Authoritative Information", desc: "Üçüncü kaynaktan dönüştürülmüş yanıt." },
  { code: 204, name: "No Content", desc: "Başarılı; gövde yok." },
  { code: 205, name: "Reset Content", desc: "Başarılı; istemci formu sıfırlasın." },
  { code: 206, name: "Partial Content", desc: "Range isteğine kısmi yanıt." },
  { code: 207, name: "Multi-Status", desc: "Birden fazla bağımsız yanıt (WebDAV)." },
  { code: 208, name: "Already Reported", desc: "Aynı kaynak daha önce raporlandı (WebDAV)." },
  { code: 226, name: "IM Used", desc: "Delta encoding ile yanıt." },

  // 3xx
  { code: 300, name: "Multiple Choices", desc: "Birden fazla olası yanıt; istemci seçim yapsın." },
  { code: 301, name: "Moved Permanently", desc: "Kalıcı yönlendirme." },
  { code: 302, name: "Found", desc: "Geçici yönlendirme." },
  { code: 303, name: "See Other", desc: "Yanıt başka URL'de; GET ile çek." },
  { code: 304, name: "Not Modified", desc: "Cache geçerli; gövde dönmedi." },
  { code: 307, name: "Temporary Redirect", desc: "Geçici; yöntem korunur." },
  { code: 308, name: "Permanent Redirect", desc: "Kalıcı; yöntem korunur." },

  // 4xx
  { code: 400, name: "Bad Request", desc: "İstek hatalı / parse edilemedi." },
  { code: 401, name: "Unauthorized", desc: "Auth gerekli ya da geçersiz." },
  { code: 402, name: "Payment Required", desc: "Ödeme gerekli (agentic payments için yeniden canlanıyor)." },
  { code: 403, name: "Forbidden", desc: "Auth var ama bu kaynak için yetkisiz." },
  { code: 404, name: "Not Found", desc: "Kaynak bulunamadı." },
  { code: 405, name: "Method Not Allowed", desc: "Bu yöntem bu kaynakta desteklenmiyor." },
  { code: 406, name: "Not Acceptable", desc: "Accept header'ıyla uyumlu temsil yok." },
  { code: 407, name: "Proxy Authentication Required", desc: "Proxy auth gerekli." },
  { code: 408, name: "Request Timeout", desc: "İstemci zamanında istek göndermedi." },
  { code: 409, name: "Conflict", desc: "Kaynak güncel haliyle çakışıyor." },
  { code: 410, name: "Gone", desc: "Kaynak kalıcı olarak silindi." },
  { code: 411, name: "Length Required", desc: "Content-Length header'ı şart." },
  { code: 412, name: "Precondition Failed", desc: "If-* header koşulu sağlanmadı." },
  { code: 413, name: "Payload Too Large", desc: "Gövde çok büyük." },
  { code: 414, name: "URI Too Long", desc: "URL çok uzun." },
  { code: 415, name: "Unsupported Media Type", desc: "Content-Type desteklenmiyor." },
  { code: 416, name: "Range Not Satisfiable", desc: "Range header'ı geçersiz." },
  { code: 417, name: "Expectation Failed", desc: "Expect header karşılanamadı." },
  { code: 418, name: "I'm a teapot", desc: "Çayı kahveyle kaynatma." },
  { code: 421, name: "Misdirected Request", desc: "Bu sunucuya gönderilemez." },
  { code: 422, name: "Unprocessable Content", desc: "Sözdizimi tamam ama semantik hata." },
  { code: 423, name: "Locked", desc: "Kaynak kilitli (WebDAV)." },
  { code: 424, name: "Failed Dependency", desc: "Bağımlı istek başarısız (WebDAV)." },
  { code: 425, name: "Too Early", desc: "Replay riskli; sonra dene." },
  { code: 426, name: "Upgrade Required", desc: "İstemci protokol yükseltmeli." },
  { code: 428, name: "Precondition Required", desc: "If-* header'ı zorunlu." },
  { code: 429, name: "Too Many Requests", desc: "Rate limit aşıldı." },
  { code: 431, name: "Request Header Fields Too Large", desc: "Header'lar çok büyük." },
  { code: 451, name: "Unavailable For Legal Reasons", desc: "Yasal nedenle erişilemez." },

  // 5xx
  { code: 500, name: "Internal Server Error", desc: "Sunucu içinde hata." },
  { code: 501, name: "Not Implemented", desc: "Yöntem desteklenmiyor." },
  { code: 502, name: "Bad Gateway", desc: "Upstream sunucudan geçersiz yanıt." },
  { code: 503, name: "Service Unavailable", desc: "Geçici aşırı yük / bakım." },
  { code: 504, name: "Gateway Timeout", desc: "Upstream zamanında yanıt vermedi." },
  { code: 505, name: "HTTP Version Not Supported", desc: "İstemci HTTP versiyonu desteklenmiyor." },
  { code: 506, name: "Variant Also Negotiates", desc: "Content negotiation döngüsü." },
  { code: 507, name: "Insufficient Storage", desc: "Sunucu yer yok (WebDAV)." },
  { code: 508, name: "Loop Detected", desc: "Sunsuz döngü algılandı (WebDAV)." },
  { code: 510, name: "Not Extended", desc: "İstemci ek extension göndersin." },
  { code: 511, name: "Network Authentication Required", desc: "Captive portal auth gerekli." }
];

function classify(code: number): string {
  if (code < 200) return "1xx · informational";
  if (code < 300) return "2xx · success";
  if (code < 400) return "3xx · redirection";
  if (code < 500) return "4xx · client error";
  return "5xx · server error";
}

export default function HttpStatusTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return STATUS;
    const isNum = /^\d+$/.test(k);
    return STATUS.filter((s) => {
      if (isNum) return String(s.code).startsWith(k);
      return s.name.toLowerCase().includes(k) || s.desc.toLowerCase().includes(k);
    });
  }, [q]);

  return (
    <>
      <div className="ws-options">
        <div className="ws-options-grid">
          <label className="ws-field">
            <span className="ws-field-label">Search</span>
            <div className="ws-field-control">
              <TextInput value={q} onChange={setQ} placeholder="404, 'gateway', 'redirect'…" />
            </div>
          </label>
        </div>
      </div>

      <ul className="ws-http-status-list">
        {filtered.map((s) => (
          <li key={s.code} className={`ws-http-status-row ws-http-status-${Math.floor(s.code / 100)}xx`}>
            <span className="ws-http-status-code">{s.code}</span>
            <div>
              <strong className="ws-http-status-name">{s.name}</strong>
              <p className="ws-http-status-desc">{s.desc}</p>
              <span className="ws-http-status-class">{classify(s.code)}</span>
            </div>
          </li>
        ))}
        {filtered.length === 0 ? <li className="ws-text-io-note">no match</li> : null}
      </ul>
    </>
  );
}
