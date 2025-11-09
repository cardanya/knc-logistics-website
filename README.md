# K&C Logistics - Next.js Web Sitesi

Bu proje, K&C Logistics lojistik şirketi için HTML'den Next.js'e dönüştürülmüş modern bir web sitesidir.

## Özellikler

- ✅ Next.js 16 (App Router)
- ✅ TypeScript desteği
- ✅ Responsive tasarım
- ✅ Dark mode desteği
- ✅ SEO optimize edilmiş (meta tags, schema.org markup)
- ✅ Font Awesome ikonları
- ✅ Modern CSS (CSS Variables ile tema desteği)
- ✅ Tüm orijinal özellikler korundu:
  - Hero section
  - Stats section
  - Services grid
  - About section
  - Testimonials
  - FAQ accordion
  - Contact form
  - Google Maps entegrasyonu (hazır)

## Kurulum

```bash
cd knc-logistics-nextjs
npm install
```

## Geliştirme

Development server'ı başlatmak için:

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Production Build

```bash
npm run build
npm start
```

## Proje Yapısı

```
knc-logistics-nextjs/
├── app/
│   ├── layout.tsx          # Ana layout (Header, Footer içerir)
│   ├── page.tsx             # Ana sayfa
│   └── globals.css          # Global CSS stilleri
├── components/
│   ├── Header.tsx           # Header component
│   └── Footer.tsx           # Footer component
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── next.config.ts           # Next.js konfigürasyonu
```

## Tamamlanan Özellikler

Aşağıdaki service detail sayfaları tamamlandı:

- ✅ `/parking-solutions` - Park çözümleri detay sayfası
- ✅ `/warehousing-services` - Depolama hizmetleri detay sayfası
- ✅ `/supply-chain-solutions` - Tedarik zinciri çözümleri detay sayfası

## Contact Form Email Setup

Contact form'dan gelen mesajları email olarak almak için email servisi konfigüre etmelisin:

1. `.env.local` dosyası oluştur (`.env.example`'dan kopyalayabilirsin)
2. Tercih ettiğin email servisini seç ve konfigüre et:
   - **Resend** (önerilen) - `npm install resend`
   - **SendGrid** - `npm install @sendgrid/mail`
   - **SMTP/Nodemailer** - `npm install nodemailer`

3. Detaylı setup talimatları için [EMAIL_SETUP.md](EMAIL_SETUP.md) dosyasına bak

**Not:** Email servisi konfigüre edilmediğinde, form submissions console'a log'lanır (development mode).

## Yapılacaklar

Gelecekte eklenebilecek özellikler:

- `/parking-booking` - Park yeri online rezervasyon sistemi (opsiyonel)
- Database integration (form submissions kaydetmek için)
- Admin dashboard (submissions görüntülemek için)

## Önemli Notlar

1. **Font Awesome**: CDN üzerinden yükleniyor ([layout.tsx](app/layout.tsx))
2. **Dark Mode**: Kullanıcı tercihi localStorage'da saklanıyor
3. **External Images**: Unsplash için `next.config.ts`'de remote patterns yapılandırıldı
4. **Schema.org**: Local business structured data eklendi (SEO için)

## Teknolojiler

- Next.js 16
- React 19
- TypeScript
- CSS Variables
- Font Awesome 6.5.1

## Lisans

© 2025 K&C Logistics. Tüm hakları saklıdır.
