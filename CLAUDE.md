# CLAUDE.md - Proje Bağlamı ve Kurallar

## Proje Özeti

Bu bir Next.js tabanlı full-stack web uygulaması projesidir. Hem frontend hem de backend kodlarını içerir.

## Obsidian Entegrasyonu

EĞER SENİNLE DOĞRUDAN DOCS PAYLAŞILIRSA, örnek >> docs/prompts/API_GENERATION.md
prompt'u uygula.

### Obsidian Vault Yapısı

Bu proje Obsidian ile birlikte kullanılmaktadır. Dokümantasyon `docs/` klasöründe bulunur ve Obsidian vault olarak yapılandırılmıştır.

### Obsidian Link Formatları

1. **Basit wiki-link formatı**: `[[dosya_adı]]`
   - Örnek: `[[API_GENERATION]]`
   - Aynı klasördeki dosyalara referans verir

### Link Çözümleme Kuralları

Obsidian linklerini çözümlerken:

- `[[dosya]]` → `/docs/` içinde `dosya.md` ara
- Dosya uzantısı `.md` olarak varsayılır
- Büyük/küçük harf duyarlıdır
