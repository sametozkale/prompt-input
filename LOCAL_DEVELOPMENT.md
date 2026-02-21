# Local'de Değişiklikleri Görmek

Uygulama **`@/src`** ile proje kökündeki **`src/`** klasöründen derlenir (npm paketi değil). Değişiklikler görünmüyorsa aşağıdakileri uygulayın.

## 1. Cache temizle ve dev server'ı yeniden başlat

```bash
# Dev server'ı durdurun (Ctrl+C), sonra:
rm -rf .next
npm run dev
```

## 2. Tarayıcıda hard refresh

- **Mac:** `Cmd + Shift + R`
- **Windows/Linux:** `Ctrl + Shift + R`

Veya DevTools açıkken yenileme butonuna sağ tıklayıp **"Empty Cache and Hard Reload"** seçin.

## 3. Gerekirse gizli pencerede dene

Cache’i atlamak için sayfayı **Incognito/Private** pencerede açın: `http://localhost:3000`

## 4. Import'un doğru olduğundan emin olun

`app/page.tsx` içinde şu satırlar **olmalı** (local kaynak için):

```ts
import { AIPromptInput } from "@/src";
import type { PromptData } from "@/src";
```

**Olmayan:** `import { AIPromptInput } from "prompt-input";` (bu npm paketini kullanır, local `src/` değil).

## 5. consumer-test ile paket kurulumunu doğrulama

`consumer-test` klasörü, paketi `file:../prompt-input-1.0.0.tgz` ile kullanır. Kurulum ve import’un doğru çalıştığını test etmek için:

```bash
# Proje kökünde: önce güncel build ile tgz oluştur
npm run pack

# consumer-test içinde kur ve test et
cd consumer-test && npm install && node test-import.cjs && node test-import.mjs
```

`npm run pack` önce `build:lib` çalıştırır, sonra `npm pack` ile güncel `dist/` içeren tgz üretir. Böylece install/import kodu güncel tiplerle doğrulanır.

---

Dev server çalışıyorsa ve yukarıdakileri yaptıysanız, `src/` altındaki tüm değişiklikler sayfada görünür.
