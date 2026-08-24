# Deploy Hazirligi

Bu proje statik HTML, Tailwind CDN ve Vanilla JavaScript ile GitHub Pages veya Netlify uzerinden yayinlanmaya hazirdir.

## Yayin Oncesi Kontrol

- [ ] Git kurulu: `git --version`
- [ ] GitHub repository adi ve kullanici adi kesinlestirildi
- [ ] `git config user.name` ve `git config user.email` kurumsal kimlikte
- [ ] Dosyalarda gercek isim, token veya gizli bilgi yok
- [ ] GitHub Pages alt dizini icin yerel linkler `./dosya.html` formatinda
- [ ] `pricing.js` baglantisi `./pricing.js` formatinda

## Ilk Git Commit'i

```powershell
git init
git branch -M main
git config user.name "Mexsu Dev"
git config user.email "contact@mexsu.com"
git add .
git commit -m "Ilk surum: Mexsu Kurye web sitesi"
```

## Remote ve Push

`KULLANICI_ADI` ve `DEPO_ADI` kesinlestikten sonra:

```powershell
git remote add origin https://github.com/KULLANICI_ADI/DEPO_ADI.git
git push -u origin main
```

## GitHub Pages

Repository > Settings > Pages:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`
- `Enforce HTTPS`: aktif

## Netlify

Netlify > Add new site > Import an existing project > GitHub > ilgili repository.

- Build command: bos
- Publish directory: `.`

Netlify site name olarak `acilkuryemexsu` ayarlandiginda canli adres:

`https://acilkuryemexsu.netlify.app`

## Notlar

- Canonical URL'ler canli domain kesinlestikten sonra guncellenmelidir.
- Ozel domain kullanilacaksa CNAME dosyasi domain kesinlestikten sonra eklenmelidir.
- GitHub Pages icin repository varsayilan adresi: `https://KULLANICI_ADI.github.io/DEPO_ADI/`.
