# Hero Slider Videos

Bu klasöre hero slider için videolarınızı ekleyin.

## Video Ekleme Talimatları:

1. Videolarınızı bu klasöre kopyalayın:
   - `hero-video-1.mp4`
   - `hero-video-2.mp4`
   - `hero-video-3.mp4`

2. Önerilen video özellikleri:
   - Format: MP4 (H.264 codec)
   - Çözünürlük: 1920x1080 veya daha yüksek
   - Süre: 8-15 saniye (döngü için ideal)
   - Dosya boyutu: 5-10 MB (web için optimize edilmiş)
   - Aspect ratio: 16:9

3. Video dosyalarınızı web için optimize edin:
   - FFmpeg kullanarak sıkıştırabilirsiniz:
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k hero-video-1.mp4
   ```

4. Videoları ekledikten sonra sayfayı yenileyin.

## Mevcut Slider Yapısı:

Slider şu anda 3 video slidedan oluşuyor:
1. Video 1 - Cross Docking / Warehousing vurgusu
2. Video 2 - Freight & fleet hareketi
3. Video 3 - Depolama ve operasyonel süreçler

Her slide 10 saniye gösterilir ve sinematik zoom efekti ile geçiş yapar.
Video oynatılamadığı durumlarda (ör. `prefers-reduced-motion` açık olduğunda) poster görselleri otomatik olarak gösterilir. Poster görselleri `public/warehousing-service.jpg`, `public/supply-chain-service.jpg` ve `public/parking-service.jpg` dosyalarından alınır.

## Slider'ı Düzenlemek:

`components/HeroSlider.tsx` dosyasındaki `slides` array'ini düzenleyerek:
- Yeni slide ekleyebilir
- Başlık ve açıklamaları değiştirebilir
- Video/görsel kaynaklarını güncelleyebilirsiniz
