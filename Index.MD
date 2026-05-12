# 📚 LAZIZ KINO BOT - TO'LIQ PAKET

## 📦 NIMA OLINDIA?

Siz to'liq ishlayotgan Telegram kino botini oladingiz. 1000 ta kinoga qiymati berilgan.

---

## 📄 FAYLLAR RO'YXATI

### 1. **QUICK-START.md** ⚡
5 daqiqada bot ishga tushiring!
- Node.js o'rnatish
- Paketlarni o'rnatish
- Bot ishga tushirish
- Admin panel foydalanish

👉 **Birinchi bu faylni o'qing!**

---

### 2. **CONFIGURATION.md** 🔧
Token va sozlamalari o'zlashtirish
- @BotFather dan token olish
- Kodni o'zlashtirish
- Admin panelni sozlash
- Video hosting sozlash
- Environment variables

👉 **Token bilan muammo bo'lsa, shu yerga oqing**

---

### 3. **README.md** 📖
To'liq qo'llanma va o'rnatish
- 📋 Xususiyatlar
- 🚀 O'rnatish (Setup)
- 🎯 Bot komandalar
- 📸 Admin panel
- 💾 Ma'lumotlar saqlash
- 💰 To'lov tizimlari
- 🔧 Deployment
- 🐛 Xatolarni tuzatish

👉 **Batafsil ma'lumot uchun shu yerga oqing**

---

## 💻 KOD FAYLALARI

### 4. **bot.js** 🤖
Polling rejimidagi bot server
- `/start` komandasi
- Callback tugmalar
- Kino kodini qabul qilish
- Premium tekshirish
- Statistika yangilash

```bash
npm start
```

**Qachon ishlatish:** Local development uchun

---

### 5. **server.js** 🌐
Webhook rejimidagi bot server (cloud uchun)
- Express server
- Webhook endpoints
- Health check
- API routes
- Real-time stats

```bash
npm start
```

**Qachon ishlatish:** Heroku, Railway, VPS'da

---

### 6. **admin-panel.html** 📊
Kinolarni boshqarish paneli
- Yangi kino qo'shish formas
- Kinolar ro'yxati
- Qidirysh va filtrlash
- Foydalanuvchilar statistikasi
- Sozlamalar

**Qo'llanma:**
1. Brauzerynga oching
2. "🎬 Kinolar Qo'shish" tabiga o'ting
3. Kino ma'lumotlarini yozib qo'shing
4. "✅ Kino Qo'shish" tugmasini bosing

---

### 7. **package.json** 📦
NPM paketlari
- express (web server)
- node-telegram-bot-api (Telegram API)

```bash
npm install
```

---

### 8. **movies-generator.js** 🎥
1000 ta test kino ma'lumoti yaratadi
- movies.json (1000 ta kino)
- users.json (test foydalanuvchilar)

```bash
node movies-generator.js
```

---

### 9. **advanced-features.js** ⭐
Premium features (optional)
- RatingSystem - kinolarga rating
- Analytics - statistika
- SearchEngine - qidirysh
- NotificationSystem - xabarnomalar
- RecommendationEngine - tavsiyalar

Bu faylni bo'lsa kerak bo'lganda qo'shing.

---

### 10. **.env.example** 🔐
Environment variables misoli
- BOT_TOKEN
- WEBHOOK_URL
- ADMIN_USERNAME
- PREMIUM_PRICE
- DATABASE_URL

**Qo'llanma:**
1. Faylni `.env` deb nomlab qayta nomlang
2. Sizning qiymatlarni kiriting
3. `npm start` chaiqasiz

---

## 🚀 ISHGA TUSHIRISH (3 QADAMI)

### QADAM 1: O'RNATISH
```bash
npm install
```

### QADAM 2: TOKEN O'ZLASHTIRISH
`bot.js` yoki `server.js` da:
```javascript
const TOKEN = 'SIZNING_TOKEN';
```

### QADAM 3: ISHGA TUSHIRISH
```bash
npm start
```

Bot endi ishlayapti! Telegramda @laziz_kino1bot botni qidiring.

---

## 📱 BOT INTERFACE

### Asosiy Tugmalar
```
🎬 Kino Yuborish        - Kino kodini so'rash
💎 Premium Obuna       - 30,000 so'm/oy
📊 Mening Status       - Foydalanuvchi statusi
❓ Yordam              - Bot haqida
```

### Foydalanuvchi Jarayoni
```
1. /start              - Botni ishga tushirish
2. Kino kodini yuboring (001-999)
3. Bot videoni yuboradi
4. Premium - cheksiz kino
5. Bepul - haftada 1 kino
```

---

## 💾 MA'LUMOTLAR

### movies.json
1000 ta kino:
- Kod (001-999)
- Nomi (O'zbek + Ingliz)
- Tavsif
- Yili
- Janr
- Video URL
- Rasmi
- Davomiyligi

### users.json
Foydalanuvchilar:
- Telegram ID
- Username
- Paket (free/premium)
- Limit
- Statistika

---

## 🎯 QADAMLAR

### 1. O'RNATISH (5 min)
```bash
npm install
node movies-generator.js
```

### 2. TOKEN O'ZLASHTIRISH (2 min)
- @BotFather da `/newbot`
- Token olib, bot.js'ga qo'shing

### 3. ISHGA TUSHIRISH (1 min)
```bash
npm start
```

### 4. ADMIN PANEL (3 min)
- admin-panel.html ni brauzerynga oching
- Kinolar qo'shish

### 5. FOYDALANISH
- Telegramda bot qidiring
- `/start` yozib boshlang
- Kino kodini yuboring

---

## 📊 ADMIN PANEL SAYT

**Avtomatik:**
- Statistika real-time
- Kinolar ro'yxati
- Foydalanuvchilar
- Export/Import

**Qo'lda:**
- Kino qo'shish
- O'chirish
- Tahrir
- Qidirysh

---

## 💎 PREMIUM PAKET

### Sozlash
1. Admin panelda "⚙️ Sozlamalar" tab
2. Premium narxini o'zlashtiring (default 30,000)
3. Admin usernameni qo'shing (@USERNAME)

### Foydalanish
1. User "💎 Premium Obuna" tugmasini bosadi
2. Admin Telegramga 30,000 so'm yuboradi
3. "Premium obuna qildim" tugmasini bosadi
4. Cheksiz kino ko'rish imkoniga ega bo'ladi

---

## 🔧 DEPLOYMENT VARIANTLARI

### LOCAL (Kompyuteryda)
```bash
npm start
```

### HEROKU (Bepul cloud)
```bash
heroku create
git push heroku main
```

### RAILWAY (Bepul $5/oy)
- railway.app
- GitHub connect
- Deploy

### VPS ($5+/oy)
- DigitalOcean
- Linode
- Linux + Node.js + bot

---

## 🎥 VIDEO HOSTING

### Variantlar

**AWS S3** (Tavsiya)
- Unlimited storage
- Fast CDN
- Pay-as-you-go

**Dropbox**
- 2GB free
- Oson upload

**Telegram**
- File ID saqlab olish
- Cheksiz

**Firebase**
- 5GB free
- Integration

---

## 📞 SUPPORT

### Murojaat
- Telegram: @Laziz_2015_67
- Bot: @laziz_kino1bot

### Savol bo'lsa
- README.md o'qing
- CONFIGURATION.md tekshiring
- advanced-features.js ko'ring

---

## ✅ CHECKLIST

### O'RNATISH
- [ ] Node.js o'rnatildi
- [ ] `npm install` bajarildi
- [ ] `node movies-generator.js` ishga tushdi
- [ ] Token bot.js'ga qo'shildi

### SOZLASH
- [ ] Admin panel ochildi
- [ ] Kinolar qo'shildi
- [ ] Premium narxi sozlandi
- [ ] Admin kontakt qo'shildi

### ISHGA TUSHIRISH
- [ ] `npm start` bajarildi
- [ ] Bot Telegramda javob beradi
- [ ] Kino kodi ishga tushadi
- [ ] Admin panel ishlaydi

---

## 📈 KEYIN

### Qayta ishlash (Phase 2)
1. ✅ Kino yuborish
2. 🔜 Rating/Sharhlar
3. 🔜 Yangi filmlar xabarnomasi
4. 🔜 Qidirysh takomillashtirish

### Integraciya (Phase 3)
1. MongoDB database
2. Stripe to'lov
3. Web dashboard
4. Mobile app

---

## 🎁 BONUSLAR

### advanced-features.js'da bor:
- Rating system
- Analytics
- Search engine
- Notifications
- Recommendations

Qo'llanma ichida comments bor. Kerak bo'lganda qo'shing.

---

## 💡 MASLAHATLAR

1. **Testdan boshlang** - Local'da ishga tushiring
2. **Kinolarni qo'shing** - Admin paneldan
3. **Premium tizimini sozlang** - Admin kontakt
4. **Hosting tanglang** - Heroku/Railway
5. **Video hosting** - AWS S3 tavsiyalangan

---

## 🎉 TAYYOR!

Barcha narsang mavjud va tayyor! 

### Birinchi qadamlar:
```bash
1. npm install
2. node movies-generator.js
3. Bot tokenini o'zlashtiring
4. npm start
5. Telegramda test qiling
```

**Omad bo'lib ko'ring! 🚀**

---

## 📞 UCHUN YORDAM

Hech qanday muammo bo'lsa:
- README.md o'qing
- CONFIGURATION.md tekshiring
- QUICK-START.md bosqich-bosqich ko'zing

---

**Yaratuvchi: Laziz**
**Bot: @laziz_kino1bot**
**Kontakt: @Laziz_2015_67**

---

**Version 1.0.0 - 2024**