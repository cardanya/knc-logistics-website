# Email Configuration Guide

Bu doküman, contact form'dan gelen mesajları email olarak almak için gerekli konfigürasyonu açıklar.

## Hızlı Başlangıç

1. `.env.local` dosyası oluştur (`.env.example`'dan kopyalayabilirsin)
2. Aşağıdaki email servislerinden birini seç ve konfigüre et
3. Development server'ı yeniden başlat

## Email Servis Seçenekleri

### Option 1: Resend (Önerilen) ⭐

**Avantajları:**
- Next.js ile mükemmel entegrasyon
- Kolay kurulum
- Ücretsiz tier: 100 email/gün, 3,000 email/ay
- Modern API ve harika dokümantasyon

**Kurulum:**

1. [Resend](https://resend.com) hesabı oluştur
2. API Key al (Settings → API Keys)
3. Domain doğrula (veya ücretsiz `onboarding@resend.dev` kullan)
4. Package'ı yükle:
   ```bash
   npm install resend
   ```

5. `.env.local` dosyasına ekle:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=noreply@yourdomain.com
   EMAIL_TO=info@knclogistics.com
   ```

**Domain Doğrulama:**
- Resend dashboard'da "Domains" → "Add Domain"
- DNS kayıtlarını ekle (SPF, DKIM, DMARC)
- Doğrulama tamamlanana kadar `onboarding@resend.dev` kullanabilirsin

---

### Option 2: SendGrid

**Avantajları:**
- Popüler ve güvenilir
- Ücretsiz tier: 100 email/gün
- Detaylı analytics

**Kurulum:**

1. [SendGrid](https://sendgrid.com) hesabı oluştur
2. API Key oluştur (Settings → API Keys)
3. Sender Identity doğrula
4. Package'ı yükle:
   ```bash
   npm install @sendgrid/mail
   ```

5. `.env.local` dosyasına ekle:
   ```env
   SENDGRID_API_KEY=SG.your_api_key_here
   EMAIL_FROM=verified-email@yourdomain.com
   EMAIL_TO=info@knclogistics.com
   ```

---

### Option 3: SMTP (Nodemailer)

**Avantajları:**
- Mevcut email hesabını kullanabilirsin
- Herhangi bir SMTP server ile çalışır
- Ücretsiz (kendi email server'ın varsa)

**Gmail ile Kurulum:**

1. Gmail hesabında 2-Factor Authentication'ı aktif et
2. App Password oluştur:
   - Google Account → Security → 2-Step Verification → App passwords
   - "Mail" ve cihazını seç
   - Oluşturulan parolayı kopyala

3. Package'ı yükle:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

4. `.env.local` dosyasına ekle:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password-here
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=info@knclogistics.com
   ```

**Diğer SMTP Providers:**
- **Outlook/Hotmail:** `smtp-mail.outlook.com:587`
- **Yahoo:** `smtp.mail.yahoo.com:587`
- **Custom SMTP:** Kendi server bilgilerini kullan

---

## Ek Ayarlar

### CC ve BCC Email Adresleri

Mesajların kopyasını başka adreslere göndermek için:

```env
# Tek adres
EMAIL_CC=manager@knclogistics.com

# Birden fazla adres (virgülle ayır)
EMAIL_CC=manager@knclogistics.com,sales@knclogistics.com

# BCC (gizli kopya)
EMAIL_BCC=archive@knclogistics.com
```

---

## Test Etme

### Development Modunda

Email provider konfigüre edilmemişse, mesajlar console'a log'lanır:

```bash
npm run dev
# Contact form'u doldur ve gönder
# Terminal'de email içeriğini göreceksin
```

### Production Test

1. `.env.local` dosyasını production ortamına kopyala (`.env.production` olarak)
2. Veya deployment platformunda (Vercel, Netlify, vb.) environment variable'ları ayarla
3. Test email'i gönder ve gelen kutunu kontrol et

---

## Email Template

Contact form'dan gelen emailler şu bilgileri içerir:

- **Service Interest:** Hangi hizmete ilgi duyduğu
- **Name:** İsim
- **Email:** Email adresi (reply yapılabilir)
- **Phone:** Telefon numarası (opsiyonel, tıklanabilir)
- **Message:** Mesaj içeriği
- **Timestamp:** Gönderilme zamanı (PST timezone)

Email şık bir HTML template ile gönderilir ve plain text alternatifi de içerir.

---

## Güvenlik Özellikleri

✅ **Rate Limiting:** IP bazlı - 1 saatte maksimum 5 submission
✅ **Form Validation:** Server-side validation
✅ **Spam Protection:** Temel spam pattern detection
✅ **XSS Protection:** Email içeriğinde HTML escape
✅ **Input Sanitization:** Tüm inputlar validate edilir

---

## Sorun Giderme

### Email Gönderilmiyor

1. **Environment Variables:**
   ```bash
   # .env.local dosyasının varlığını kontrol et
   cat .env.local

   # Server'ı restart et
   npm run dev
   ```

2. **API Keys:**
   - Doğru API key kullanıldığından emin ol
   - Key'in aktif olduğunu kontrol et
   - Resend/SendGrid dashboard'dan test et

3. **Domain Verification:**
   - Resend/SendGrid'de domain doğrulandı mı kontrol et
   - DNS kayıtları doğru mu?

4. **Console Logs:**
   ```bash
   # Terminal'de error log'larını kontrol et
   # Browser console'da network request'i kontrol et
   ```

### Gmail SMTP Hata Alıyorum

- 2FA aktif mi?
- App Password kullanıyor musun? (normal şifre çalışmaz)
- "Less secure app access" kapalı olmalı
- SMTP host ve port doğru mu? (`smtp.gmail.com:587`)

### Rate Limit Hatası

- 1 saat bekle veya rate limit ayarlarını düzenle
- Production'da Redis kullanarak daha sofistike rate limiting ekle

---

## Production Deployment

### Vercel

1. Project Settings → Environment Variables
2. `.env.local`'daki tüm değişkenleri ekle
3. Redeploy

### Netlify

1. Site Settings → Build & Deploy → Environment
2. Variables'ları ekle
3. Clear cache and deploy

### Diğer Platformlar

- Environment variables'ları platform dokümantasyonuna göre ekle
- `.env.local` dosyasını **asla** commit'leme!

---

## İleriye Dönük Geliştirmeler

Daha sonra eklenebilecek özellikler:

- [ ] Database integration (submissions'ları kaydet)
- [ ] Email notifications webhook'u
- [ ] Auto-reply email (teşekkür mesajı)
- [ ] Admin dashboard (submissions'ları görüntüle)
- [ ] Email templates (farklı servisler için)
- [ ] Attachment upload desteği

---

## Destek

Sorularınız için:
- Email: info@knclogistics.com
- Resend Docs: https://resend.com/docs
- SendGrid Docs: https://docs.sendgrid.com
- Nodemailer Docs: https://nodemailer.com
