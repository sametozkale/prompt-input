# npm'de Yayınlama Rehberi — prompt-input

## Ön koşullar

1. **npm hesabı**  
   Yoksa: https://www.npmjs.com/signup  
   E-posta doğrulaması yap (npm gerekirse ister).

2. **Paket adı**  
   `prompt-input` adı npm'de boş mu kontrol et:  
   https://www.npmjs.com/package/prompt-input  
   Doluysa `package.json` içinde `"name": "@kullaniciadi/prompt-input"` gibi scope'lu bir isim kullan.

---

## Adım adım

### 1. Proje dizinine geç

```bash
cd "/Users/sametozkale/Desktop/Prompt Input"
```

### 2. Bağımlılıkları kur (temiz build için)

```bash
npm install
```

### 3. Testleri çalıştır

```bash
npm run test
```

Hata varsa düzelt; yayına çıkmadan önce testlerin geçmesi iyi olur.

### 4. Kütüphaneyi build et

```bash
npm run build:lib
```

Bu komut `dist/` klasörünü oluşturur. `prepublishOnly` sayesinde `npm publish` öncesi de otomatik çalışır; yine de yerelde bir kez denemek faydalı.

### 5. npm’e giriş yap

```bash
npm login
```

- Username: npm kullanıcı adın  
- Password: şifre  
- Email: (kayıtlı e-posta)  
- OTP: İki adımlı doğrulama açıksa gelen kodu gir  

“Logged in as …” mesajını görünce giriş tamamdır.

### 6. Paketi yayınla

**İlk kez yayınlıyorsan (unscoped paket):**

```bash
npm publish
```

**Scope’lu paket kullanıyorsan (örn. `@kullaniciadi/prompt-input`):**

```bash
npm publish --access public
```

Başarılı olursa örnek çıktı:

```
+ prompt-input@1.0.0
```

### 7. Kontrol et

- https://www.npmjs.com/package/prompt-input  
  Paket sayfası birkaç dakika içinde görünür.

Başka projede denemek için:

```bash
npm install prompt-input
```

---

## Sonraki sürümler (1.0.1, 1.0.2, …)

1. **Sürümü yükselt**

   Patch (1.0.0 → 1.0.1):

   ```bash
   npm version patch
   ```

   Minor (1.0.0 → 1.1.0):

   ```bash
   npm version minor
   ```

   Major (1.0.0 → 2.0.0):

   ```bash
   npm version major
   ```

   Bu komut `package.json` ve (varsa) git tag’i günceller.

2. **Tekrar yayınla**

   ```bash
   npm publish
   ```

3. **Git’e push et** (tag’i de gönder)

   ```bash
   git push && git push --tags
   ```

---

## Sık karşılaşılan hatalar

| Hata | Çözüm |
|------|--------|
| `403 Forbidden` | Giriş yap: `npm login`. Paket adı başkasına aitse isim değiştir veya scope kullan. |
| `402 Payment Required` | Scope’lu paket için: `npm publish --access public` |
| `You must verify your email` | npm hesabındaki e-postayı doğrula. |
| `Package name too similar to existing package` | `package.json` içinde farklı/scope’lu bir `name` seç. |

---

## Özet komutlar (ilk yayın)

```bash
cd "/Users/sametozkale/Desktop/Prompt Input"
npm install
npm run test
npm run build:lib
npm login
npm publish
```

Bu adımları tamamladıktan sonra paket npm’de yayında olur.
