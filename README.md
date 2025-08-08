# ElpiSoftware - Dijital Portfolyo Sitesi

Modern, responsive ve tamamen statik bir dijital stüdyo portfolyo sitesi. Startuplar ve bireysel müşteriler için web tasarımı, mobil uygulama geliştirme ve marka yönetimi hizmetleri sunan yaratıcı ajans sitesi.

## 🚀 Özellikler

- **Tamamen Statik**: HTML, CSS ve JavaScript ile geliştirilmiş
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Modern UI/UX**: Kullanıcı dostu ve estetik arayüz
- **SEO Optimizasyonu**: Arama motorları için optimize edilmiş
- **Hızlı Performans**: Optimize edilmiş kod ve görseller
- **Erişilebilirlik**: WCAG standartlarına uygun
- **Cross-Browser Uyumluluk**: Tüm modern tarayıcılarda çalışır

## 📁 Dosya Yapısı

```
digital-studio-portfolio/
├── index.html                           # Ana sayfa
├── about.html                           # Hakkımızda sayfası
├── services.html                        # Hizmetler sayfası
├── contact.html                         # İletişim sayfası
├── assets/
│   ├── css/
│   │   └── styles.css                   # Ana stil dosyası
│   ├── js/
│   │   └── main.js                      # Ana JavaScript dosyası
│   └── img/                             # Görsel dosyaları (placeholder)
├── favicon.svg                          # Site ikonu
└── README.md                            # Bu dosya
```

## 🛠️ Kurulum

### Gereksinimler
- Modern bir web tarayıcısı
- HTTP sunucu (geliştirme için)
- Metin editörü (VSCode önerilir)

### Yerel Geliştirme

1. **Projeyi İndirin**
   ```bash
   # Git ile klonlama
   git clone https://github.com/kullanici/elpisoftware-portfolio.git
   cd elpisoftware-portfolio
   
   # Veya ZIP dosyasını indirip açın
   ```

2. **VSCode ile Açın**
   ```bash
   code .
   ```

3. **Live Server Kurulumu**
   - VSCode'da Live Server eklentisini yükleyin
   - `index.html` dosyasına sağ tıklayın
   - "Open with Live Server" seçeneğini tıklayın

4. **Alternatif Sunucu Seçenekleri**
   ```bash
   # Python ile (Python 3)
   python -m http.server 8000
   
   # Node.js ile
   npx http-server
   
   # PHP ile
   php -S localhost:8000
   ```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Ana Renk**: #6366f1 (Indigo)
- **Hover Rengi**: #4f46e5 (Koyu Indigo)
- **Metin Renkleri**: #1e293b, #475569, #64748b
- **Arka Plan**: #ffffff, #f8fafc

### Tipografi
- **Ana Font**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Başlık Boyutları**: clamp() kullanarak responsive
- **Line Height**: 1.6 (okunabilirlik için)

### Animasyonlar
- **Fade In**: Scroll-triggered animasyonlar
- **Hover Efektleri**: Subtle transform ve shadow değişimleri
- **Transition Süresi**: 0.3s (smooth deneyim için)

## 📱 Responsive Breakpoints

```css
/* Mobil */
@media (max-width: 480px) { /* Extra small devices */ }

/* Tablet */
@media (max-width: 768px) { /* Small devices */ }

/* Laptop */
@media (max-width: 1024px) { /* Medium devices */ }

/* Desktop */
@media (min-width: 1025px) { /* Large devices */ }
```

## ⚡ Performans Optimizasyonu

### CSS
- CSS variables kullanımı
- Minimal ve temiz kod yapısı
- Critical CSS inline yükleme
- Kullanılmayan kod temizleme

### JavaScript
- Vanilla JS (framework dependency yok)
- Event delegation kullanımı
- Debounced scroll events
- Lazy loading için Intersection Observer

### HTML
- Semantic markup kullanımı
- Optimized meta tags
- Proper heading hierarchy
- Alt text'ler ve ARIA labels

## 🔧 Özelleştirme

### Renkleri Değiştirme
`assets/css/styles.css` dosyasında CSS variables bölümünü düzenleyin:

```css
:root {
    --primary-color: #6366f1;  /* Ana rengi değiştirin */
    --primary-hover: #4f46e5;  /* Hover rengini değiştirin */
    /* Diğer renkler... */
}
```

### İçerik Güncelleme
1. **Şirket İsmi**: Tüm HTML dosyalarında "ElpiSoftware" yerine kendi isminizi yazın
2. **İletişim Bilgileri**: `contact.html` ve footer bölümlerini güncelleyin
3. **Hizmetler**: `services.html` dosyasında kendi hizmetlerinizi ekleyin
4. **Projeler**: Ana sayfadaki örnek projeleri kendi çalışmalarınızla değiştirin

### Yeni Sayfa Ekleme
1. Mevcut bir HTML dosyasını kopyalayın
2. İçeriği özelleştirin
3. Navigation menüsüne link ekleyin
4. SEO meta tags'lerini güncelleyin

## 🚀 Hosting

### GitHub Pages
1. GitHub'a repository upload edin
2. Settings > Pages bölümünden enable edin
3. `main` branch'i seçin
4. Site otomatik olarak yayına çıkar

### Netlify
1. Netlify.com'a kayıt olun
2. "New site from Git" seçeneğini tıklayın
3. GitHub repository'yi bağlayın
4. Deploy settings varsayılan olarak bırakın
5. Deploy butonuna tıklayın

### Vercel
1. Vercel.com'a kayıt olun
2. "Import Project" butonunu tıklayın
3. GitHub repository URL'sini girin
4. Otomatik deploy başlar

### Traditional Hosting
1. Tüm dosyaları ZIP'leyin
2. FTP ile web hosting'e upload edin
3. `index.html` root dizinde olduğundan emin olun

## 📊 SEO Checklist

### Meta Tags ✅
- [x] Unique title her sayfada
- [x] Meta description (155 karakter limit)
- [x] Open Graph tags
- [x] Canonical URL'ler
- [x] Robots meta

### İçerik ✅
- [x] H1-H6 hierarchy
- [x] Alt text'ler
- [x] Internal linking
- [x] Semantic markup
- [x] Schema markup potansiyeli

### Teknik ✅
- [x] Mobile-friendly
- [x] Fast loading
- [x] HTTPS ready
- [x] XML sitemap potansiyeli
- [x] Clean URL structure

## 🛡️ Güvenlik

### Best Practices
- Tüm external linkler `rel="noopener"` ile
- Form validation (client-side)
- XSS prevention awareness
- Content Security Policy hazır
- HTTPS kullanımı önerilir

### Privacy
- Analytics entegrasyonu isteğe bağlı
- Cookie policy ekleme seçeneği
- GDPR compliance hazırlığı

## 🧪 Test Edilmesi Gerekenler

### Tarayıcı Uyumluluğu
- [ ] Chrome (son 2 versiyon)
- [ ] Firefox (son 2 versiyon)
- [ ] Safari (son 2 versiyon)
- [ ] Edge (son 2 versiyon)

### Cihaz Testleri
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Performans Testleri
- [ ] Google PageSpeed Insights
- [ ] GTmetrix analizi
- [ ] Lighthouse audit
- [ ] WebPageTest.org

### Accessibility Testleri
- [ ] Screen reader uyumluluğu
- [ ] Keyboard navigation
- [ ] Color contrast ratio
- [ ] Focus indicators

## 🔧 Geliştirme Araçları

### VSCode Eklentileri
- **Live Server**: Canlı önizleme için
- **Prettier**: Kod formatlama
- **Auto Rename Tag**: HTML tag düzenleme
- **CSS Peek**: CSS class'larını görme
- **HTML CSS Support**: IntelliSense desteği

### Faydalı Araçlar
- **Can I Use**: Browser support kontrolü
- **Lighthouse**: Performance audit
- **WAVE**: Accessibility testi
- **TinyPNG**: Görsel optimizasyonu

## 📚 İlave Kaynaklar

### CSS
- [MDN CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Grid Garden](https://cssgridgarden.com/)
- [Flexbox Froggy](https://flexboxfroggy.com/)

### JavaScript
- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

### Design
- [Google Fonts](https://fonts.google.com/)
- [Coolors](https://coolors.co/) - Renk paleti
- [Unsplash](https://unsplash.com/) - Ücretsiz fotoğraflar

## 🐛 Bilinen Sorunlar ve Çözümler

### Safari'de CSS Grid Sorunları
```css
/* Çözüm: autoprefixer kullanın veya vendor prefix ekleyin */
display: -ms-grid;
display: grid;
```

### Internet Explorer Desteği
Proje modern tarayıcılar için optimize edilmiştir. IE desteği için:
- CSS Grid yerine Flexbox kullanın
- CSS custom properties için fallback ekleyin
- JavaScript ES6+ özelliklerini transpile edin

### Mobil Safari'de 100vh Sorunu
```css
/* Çözüm: */
min-height: 100vh;
min-height: -webkit-fill-available;
```

## 🤝 Katkıda Bulunma

1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'i push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

### Kod Standartları
- **HTML**: Semantic markup kullanın
- **CSS**: BEM methodology tercih edilir
- **JavaScript**: ES6+ kullanın, vanilla JS tercih edin
- **Commit Messages**: Türkçe, açıklayıcı mesajlar

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 Destek

### Teknik Destek
- **Dokümantasyon**: Bu README dosyası
- **Issues**: GitHub Issues üzerinden
- **Discussions**: Genel sorular için

### İletişim
- **E-posta**: hello@elpisoftware.com
- **Website**: [elpisoftware.com](https://elpisoftware.com)
- **LinkedIn**: [ElpiSoftware](https://linkedin.com/company/elpisoftware)

## 🔄 Versiyon Geçmişi

### v1.0.0 (2024-01-15)
- ✨ İlk release
- 🎨 Modern UI/UX tasarım
- 📱 Tam responsive destek
- ⚡ Performance optimizasyonları
- 🔍 SEO optimizasyonları
- ♿ Accessibility desteği

### Gelecek Sürümler
- [ ] Blog sistemi entegrasyonu
- [ ] CMS entegrasyonu seçeneği
- [ ] PWA (Progressive Web App) özellikleri
- [ ] Dark mode desteği
- [ ] Multi-language desteği
- [ ] Advanced analytics entegrasyonu

---

**Not**: Bu proje, modern web standartlarına uygun olarak geliştirilmiştir. Herhangi bir framework dependency'si bulunmamaktadır ve tamamen statik dosyalardan oluşmaktadır.

**Geliştirici**: ElpiSoftware  
**Son Güncelleme**: 2024-01-15  
**Versiyon**: 1.0.0