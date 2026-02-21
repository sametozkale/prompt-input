# Bugs & İyileştirmeler

Proje analizi sonucu tespit edilen hatalar, riskler ve iyileştirme önerileri.

---

## 1. Hatalar / Bugs

### 1.1 Boş `agents` array durumu
- **Konum:** `src/ai-prompt-input.tsx` (satır 51)
- **Sorun:** `agents = DEFAULT_AGENTS` default olsa da, kullanıcı `agents={[]}` geçerse `agents[0]?.id` `undefined` olur; fallback `"agent"` kullanılır ama dropdown boş liste gösterir, seçim yapılamaz.
- **Öneri:** `agents` boşsa bile `selected` state'i geçerli bir değerde tut (örn. `"agent"`); dropdown’u disabled göster veya “No agents” mesajı ver.

### 1.2 Ses kaydı gerçekten çalışmıyor
- **Konum:** `src/ai-prompt-input.tsx` (satır 132–142)
- **Sorun:** `handleVoiceToggle` içinde “In a real app, would start MediaRecorder” yorumu var; kayıt başlamıyor, sadece durdurulunca `onVoiceRecord?.(new Blob())` ile boş Blob gönderiliyor.
- **Öneri:** README/API dokümantasyonunda “Voice UI only, implementation is app-specific” açıkça belirtilmeli.

### 1.3 Hata mesajı kapatılamıyor
- **Konum:** `src/ai-prompt-input.tsx` (satır 344–365)
- **Sorun:** `onSubmit` hata fırlatınca `setError` ile mesaj gösteriliyor; kullanıcının hatayı kapatması veya tekrar denemesi için buton yok.
- **Öneri:** Hata alanına “Dismiss” / “Tekrar dene” butonu eklenmeli veya bir süre sonra otomatik temizlenmeli.

### 1.4 Sources menüde yeni connector tipi kırılması
- **Konum:** `src/sources-menu.tsx` (satır 130–131)
- **Sorun:** `connector.id === "social-media" ? Share2 : GraduationCap` ile ikon seçiliyor. `connectorOptions`’a yeni id (örn. `"news"`) eklenirse ikon hep `GraduationCap` olur; id’ye göre genişletilebilir değil.
- **Öneri:** `ConnectorSource` tipine opsiyonel `icon` alanı eklenebilir veya id → icon map (switch/object) ile tüm id’ler açıkça eşlenmeli.

### 1.5 Dosya eklemede boyut limiti yok
- **Konum:** `src/attach-button.tsx`
- **Sorun:** `accept` ile tip sınırı var ama dosya boyutu kontrolü yok. Çok büyük dosya yüklenebilir, bellek/performans sorunu riski.
- **Öneri:** Opsiyonel `maxFileSize` prop veya tek seferde toplam boyut limiti; aşımda kullanıcıya uyarı.

### 1.6 Dropdown açıkken scroll kilidi
- **Konum:** `src/ai-prompt-input.tsx` (satır 82–92)
- **Sorun:** Herhangi bir dropdown açıkken `window.scrollTo(0, lockedY)` ile scroll tamamen kilitleniyor. Mobilde veya uzun sayfada istenmeyen davranış olabilir.
- **Öneri:** Sadece dropdown açıldığı anda bir kez scroll pozisyonu ayarlanabilir; sürekli scroll event’te kilitlemek yerine daha hafif bir strateji (örn. sadece open anında scroll) değerlendirilebilir.

---

## 2. Dokümantasyon / API tutarsızlıkları

### 2.1 Task placeholder README’de yok
- **Konum:** `README.md` vs `src/ai-prompt-input.tsx`
- **Sorun:** Agent “Task” seçiliyken placeholder “Describe a task to automate” oluyor; README’de sadece default placeholder anlatılıyor, Task davranışı yazmıyor.
- **Öneri:** README’de “When Task is selected, the placeholder is ‘Describe a task to automate’ unless overridden.” gibi bir cümle eklenmeli.

### 2.2 PromptData ve placeholder
- **Konum:** `README.md` API tablosu
- **Sorun:** `placeholder` prop’un Task/Agent’a göre değiştiği (component içi mantık) dokümante değil.
- **Öneri:** Placeholder satırında “Default; when agent is Task, shows ‘Describe a task to automate’.” notu eklenebilir.

---

## 3. Kod kalitesi / Bakım

### 3.1 Duplicate connector default verisi
- **Konum:** `src/types.ts` (`DEFAULT_CONNECTOR_SOURCES`) ve `src/sources-menu.tsx` (`DEFAULT_CONNECTORS`)
- **Sorun:** Aynı liste iki yerde tanımlı; biri güncellenip diğeri unutulursa tutarsızlık olur.
- **Öneri:** Tek kaynak kullan (örn. types’taki default’u import et veya sources-menu’deki kaldırıp sadece types’tan besle).

### 3.2 Select value type assertion
- **Konum:** `src/agent-selector.tsx` (satır 37), `src/model-selector.tsx` (satır 39)
- **Sorun:** `onValueChange={(value) => onSelect(value as AgentType)}` — runtime’da Radix’ten gelen value beklenmeyen bir string olursa type güvenliği yanıltıcı olur.
- **Öneri:** Gelen `value`’yu `agents.map(a => a.id)` / `models.map(m => m.id)` ile kontrol et; geçerli değilse çağırma veya fallback uygula.

### 3.3 CodeBlock hata yönetimi
- **Konum:** `app/components/CodeBlock.tsx` (satır 48)
- **Sorun:** `codeToHtml(code, …).then(setHtml)` — promise reject olursa (shiki hatası, bilinmeyen dil) catch yok, sessiz fail veya unhandled rejection.
- **Öneri:** `.catch(() => setHtml("<pre><code>" + escapeHtml(code) + "</code></pre>"))` veya hata mesajı göster.

---

## 4. Test eksiklikleri

### 4.1 Task placeholder testi yok
- **Konum:** `src/ai-prompt-input.test.tsx`
- **Sorun:** “Task” seçiliyken placeholder “Describe a task to automate” davranışı test edilmiyor.
- **Öneri:** Agent “task” seçiliyken placeholder metnini assert eden bir test eklenmeli.

### 4.2 Dark theme placeholder testi
- **Konum:** `src/ai-prompt-input.test.tsx` (satır 40–45)
- **Sorun:** Sadece “renders with theme dark” ve aynı default placeholder kontrol ediliyor; Task + dark veya theme’e göre placeholder değişimi yok.
- **Öneri:** Dark + Task kombinasyonu ve placeholder için ayrı test eklenebilir.

### 4.3 File attach, sources, research model
- **Konum:** `src/ai-prompt-input.test.tsx`
- **Sorun:** Dosya ekleme, sources açma/değiştirme, research model seçimi ve bunların `onSubmit` payload’ında doğru gelmesi test edilmiyor.
- **Öneri:** En azından birer smoke test (attach, sources toggle, model değişimi + submit payload) eklenmeli.

---

## 5. Stil / UX tutarsızlıkları

### 5.1 Demo kutu min-height farkı
- **Konum:** `app/globals.css`
- **Sorun:** `.demo-box-inner` için `min-height: 148px`, `.demo-dark-inner` için `min-height: 128px`. Default ve Dark sergileme alanları farklı yükseklikte.
- **Öneri:** İkisini aynı değerde tutmak (örn. 148px) görsel tutarlılık sağlar.

---

## 6. Bağımlılık / Güvenlik

### 6.1 npm audit uyarıları
- **Konum:** `package.json` (proje kökü)
- **Sorun:** `npm install` çıktısında “19 vulnerabilities (5 moderate, 14 high)” bildiriliyor.
- **Öneri:** `npm audit` çalıştırıp raporu inceleyin; mümkün olanları `npm audit fix` ile giderin, kalanları dokümante edip planlayın.
- **Not:** `npm audit fix` güvenli düzeltmeleri uyguladı; kalan uyarılar `npm audit fix --force` (vitest/eslint major güncellemeleri) gerektiriyor, breaking change riski var.

---

## 7. Erişilebilirlik (A11y)

### 7.1 Loading / error bölgesi
- **Konum:** `src/ai-prompt-input.tsx`
- **Durum:** `role="status"`, `aria-live="polite"` ve `role="alert"` kullanılmış; iyi.
- **Öneri:** Hata mesajı için `aria-describedby` veya kısa bir “Error:” öneki eklenebilir; ekran okuyucu için daha net olur.

### 7.2 Focus yönetimi
- **Konum:** Dropdown’lar (Agent, Model, Sources)
- **Durum:** Radix kullanıldığı için temel focus yönetimi var.
- **Öneri:** Dropdown kapatıldığında focus’un trigger’a dönmesi Radix’te varsayılan; özelleştirme yapılmadığı sürece ek aksiyon gerekmez.

---

## Özet öncelikler

| Öncelik | Madde | Aksiyon |
|--------|--------|--------|
| Yüksek | 1.2 | Ses kaydı: ya implement et ya dokümante et |
| Yüksek | 1.3 | Hata mesajı için dismiss/retry |
| Orta   | 1.4 | Sources connector ikonları genişletilebilir yap |
| Orta   | 1.5 | Dosya boyut limiti (prop veya dokümantasyon) |
| Orta   | 3.1 | Connector default tek kaynak |
| Orta   | 3.3 | CodeBlock promise catch |
| Düşük  | 1.1 | Boş agents edge case |
| Düşük  | 1.6 | Scroll lock stratejisini gözden geçir |
| Düşük  | 2.1, 2.2 | README placeholder/Task |
| Düşük  | 4.x | Eksik testler |
| Düşük  | 5.1 | Demo min-height tutarlılığı |
| Düşük  | 6.1 | npm audit |

---

*Son güncelleme: Proje analizi ile oluşturuldu.*
