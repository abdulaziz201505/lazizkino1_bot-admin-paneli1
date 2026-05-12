// server.js - Express server webhook bilan

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Bot konfiguratsiyasi
const TOKEN = process.env.BOT_TOKEN || '8707470724:AAGAI02VK56b077kBYYNPfjs6yyAEs5JEOI';
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://yourdomain.com';

// Bot options
const botOptions = {
    webHook: {
        port: process.env.PORT || 3000,
        host: '0.0.0.0'
    }
};

const bot = new TelegramBot(TOKEN, botOptions);

// Webhook o'rnatish
const botWebHookURL = `${WEBHOOK_URL}/bot${TOKEN}`;

// Fayl yo'llari
const moviesFile = path.join(__dirname, 'movies.json');
const usersFile = path.join(__dirname, 'users.json');

// ========== UTILITY FUNCTIONS ==========

function readMovies() {
    try {
        if (fs.existsSync(moviesFile)) {
            return JSON.parse(fs.readFileSync(moviesFile, 'utf8'));
        }
    } catch (e) {
        console.error('Kinolar o\'qib bo\'lmadi:', e);
    }
    return {};
}

function readUsers() {
    try {
        if (fs.existsSync(usersFile)) {
            return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        }
    } catch (e) {
        console.error('Foydalanuvchilar o\'qib bo\'lmadi:', e);
    }
    return {};
}

function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function saveMovies(movies) {
    fs.writeFileSync(moviesFile, JSON.stringify(movies, null, 2));
}

function getMainKeyboard() {
    return {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🎨 Multfilm Yuborish', callback_data: 'request_movie' }],
                [{ text: '👑 Premium Obuna (20,000 so\'m/oy)', callback_data: 'premium' }],
                [{ text: '📊 Mening Status', callback_data: 'status' }],
                [{ text: '❓ Yordam', callback_data: 'help' }]
            ]
        }
    };
}

// ========== BOT HANDLERS ==========

// /start komandasi
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const users = readUsers();

    if (!users[userId]) {
        users[userId] = {
            chatId: chatId,
            username: msg.from.username || 'Anonim',
            firstName: msg.from.first_name || '',
            plan: 'free',
            freeBudget: 1,
            premiumExpires: null,
            joinDate: new Date().toISOString(),
            downloadsThisWeek: 0,
            lastReset: new Date().toISOString()
        };
        saveUsers(users);
    }

    const welcomeMessage =
        `👋 Salom! Multfilm Botga xush kelibsiz!\n\n` +
        `🎨 Bolalarning sevimli multfilmlari shu yerda!\n\n` +
        `📊 TARIFLAR:\n` +
        `🆓 Bepul paket: Haftada 2 ta multfilm\n` +
        `👑 Premium paket: Cheksiz multfilm (20,000 so'm/oy)\n\n` +
        `Quyidagi tugmalardan birini tanlang:`;

    bot.sendMessage(chatId, welcomeMessage, getMainKeyboard());
});

// /cancel komandasi
bot.onText(/\/cancel/, (msg) => {
    bot.sendMessage(msg.chat.id, '❌ Amal bekor qilindi', getMainKeyboard());
});

// Callback tugmalar
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const userId = query.from.id;
    const data = query.data;
    const users = readUsers();
    const user = users[userId];

    bot.answerCallbackQuery(query.id);

    // Request movie
    if (data === 'request_movie') {
        const msg =
            `🎨 Multfilm kodini yuboring!\n\n` +
            `Multfilm kodlari 1 dan 1000 gacha.\n` +
            `Misol: 001, 050, 100, 999\n\n` +
            `/cancel - Bekor qilish`;

        bot.sendMessage(chatId, msg);
    }

    // Premium obuna
    else if (data === 'premium') {
        if (user.plan === 'premium' && new Date(user.premiumExpires) > new Date()) {
            bot.sendMessage(chatId, '✅ Siz allaqachon premium a\'zo!');
            return;
        }

        const premiumMsg =
            `👑 PREMIUM OBUNA\n\n` +
            `Narxi: 20,000 so'm (1 oy)\n\n` +
            `IMKONIYATLAR:\n` +
            `✅ Cheksiz multfilm\n` +
            `✅ HD sifat\n` +
            `✅ Hech qachon reklama\n` +
            `✅ Yangi multfilm-filmlar\n\n` +
            `TO'LOV JARAYONI:\n` +
            `1. @multfilm_admin ga yozing\n` +
            `2. 20,000 so'm transfer qiling\n` +
            `3. Sudni chiqarib berganidan keyin\n` +
            `4. "Premium obuna qildim" tugmasini bosing`;

        const premiumKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '✅ Premium Obuna Qildim', callback_data: 'premium_confirm' }],
                    [{ text: '❌ Orqaga', callback_data: 'back_menu' }]
                ]
            }
        };

        bot.sendMessage(chatId, premiumMsg, premiumKeyboard);
    }

    // Premium tasdiqlash
    else if (data === 'premium_confirm') {
        users[userId].plan = 'premium';
        users[userId].premiumExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        saveUsers(users);

        const confirmMsg =
            `✅ XUSH KELIBSIZ PREMIUM A'ZO!\n\n` +
            `🎉 Endi siz cheksiz multfilm ko'rishingiz mumkin!\n` +
            `📅 Tugash sanasi: ${new Date(users[userId].premiumExpires).toLocaleDateString('uz-UZ')}\n\n` +
            `Multfilm kodini yuboring (1-1000)`;

        bot.sendMessage(chatId, confirmMsg, getMainKeyboard());
    }

    // Status
    else if (data === 'status') {
        let statusMsg = `📊 SIZNING AKKAUNTINGIZ\n\n`;
        statusMsg += `👤 Ism: ${user.firstName || user.username}\n`;
        statusMsg += `📅 Qo'shilgan: ${new Date(user.joinDate).toLocaleDateString('uz-UZ')}\n\n`;

        if (user.plan === 'free') {
            const remaining = Math.max(0, user.freeBudget - user.downloadsThisWeek);
            statusMsg += `🆓 PAKET: BEPUL\n`;
            statusMsg += `📥 Bu hafta qolgan: ${remaining}/${user.freeBudget} kino\n`;
        } else {
            const expireDate = new Date(user.premiumExpires);
            const now = new Date();
            const isPremium = expireDate > now;

            if (isPremium) {
                statusMsg += `💎 PAKET: PREMIUM (FAOL)\n`;
                statusMsg += `⏰ Tugash: ${expireDate.toLocaleDateString('uz-UZ')}\n`;
            } else {
                statusMsg += `💎 PAKET: PREMIUM (MUDDATI O'TTIDI)\n`;
                statusMsg += `⚠️ Yanida obuna qilinishi kerak`;
            }
        }

        bot.sendMessage(chatId, statusMsg);
    }

    // Yordam
    else if (data === 'help') {
        const helpMsg =
            `❓ BOT QO'LLANMASI\n\n` +
            `1️⃣ MULTFILM YUBORISH\n` +
            `• Multfilm kodini yuboring (001-999)\n` +
            `• Bot sizga video yuboradi\n\n` +

            `2️⃣ BEPUL PAKET\n` +
            `• Haftada 2 ta multfilm\n` +
            `• Cheksiz foydalanish\n\n` +

            `3️⃣ PREMIUM PAKET\n` +
            `• Narxi: 20,000 so'm/oy\n` +
            `• Cheksiz multfilm\n` +
            `• Hech qanday reklama\n\n` +

            `4️⃣ QOLLANMA\n` +
            `• Multfilm kodi - nomerini yuboring\n` +
            `• Bot - videoni yuboradi\n` +
            `• Davomi - yangi kod yuboring\n\n` +

            `👶 BOLALAR UCHUN XAVFSIZ!\n` +
            `✅ Faqat bolalarga mos multfilm\n` +
            `✅ Hech qanday xavfli kontent yo\'q\n\n` +

            `📞 MUROJAAT\n` +
            `@multfilm_admin ga yozing`;

        bot.sendMessage(chatId, helpMsg);
    }

    // Orqaga asosiy menu
    else if (data === 'back_menu') {
        bot.sendMessage(chatId, '🏠 Asosiy menuya qaytdingiz', getMainKeyboard());
    }
});

// Text xabarlar (kino kodi)
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const text = msg.text;

    // Boshlan'ich va cancel commandlari o'tkazib yuborish
    if (text.startsWith('/')) return;

    const users = readUsers();
    const movies = readMovies();
    const user = users[userId];

    if (!user) {
        bot.sendMessage(chatId, 'Iltimos, /start tugmasini bosing');
        return;
    }

    // Kino kodi
    const movieCode = text.trim().padStart(3, '0');
    const movieCodeNum = parseInt(movieCode);

    if (isNaN(movieCodeNum) || movieCodeNum < 1 || movieCodeNum > 1000) {
        bot.sendMessage(chatId,
            `❌ Noto'g'ri kino kodi!\n` +
            `1 dan 1000 gacha raqamni yuboring.\n` +
            `Misol: 001, 050, 999`
        );
        return;
    }

    // Heftalik budgetni tekshirish
    const lastReset = new Date(user.lastReset);
    const now = new Date();
    const daysDiff = Math.floor((now - lastReset) / (1000 * 60 * 60 * 24));

    if (daysDiff >= 7) {
        user.downloadsThisWeek = 0;
        user.lastReset = now.toISOString();
    }

    // Premium tekshirish
    const isPremium = user.plan === 'premium' && new Date(user.premiumExpires) > now;

    if (!isPremium && user.downloadsThisWeek >= user.freeBudget) {
        const limitMsg =
            `❌ Bu hafta limit tugadi!\n\n` +
            `Haftada faqat ${user.freeBudget} ta kino ko'rishingiz mumkin.\n\n` +
            `💎 Premium obuna qilsangiz:\n` +
            `✅ Cheksiz kinolar\n` +
            `✅ HD sifat\n` +
            `✅ Yangi kinolar\n\n` +
            `Narxi: 30,000 so'm (1 oy)`;

        bot.sendMessage(chatId, limitMsg);
        return;
    }

    // Kino qidirish
    const movie = movies[movieCode];

    if (!movie) {
        bot.sendMessage(chatId, `❌ Kino #${movieCode} topilmadi!`);
        return;
    }

    // Kino yuborish
    const caption =
        `🎬 ${movie.nameUz} (${movie.nameEn})\n` +
        `📅 Yili: ${movie.year}\n` +
        `🎭 Janr: ${movie.genre}\n` +
        `⏱️ Davomiyligi: ${movie.duration} min\n\n` +
        `📖 Tavsif:\n${movie.desc}\n\n` +
        `💎 Laziz Kino Bot`;

    // Video URL bilan yuborish
    try {
        bot.sendVideo(chatId, movie.url, {
            caption: caption,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: '⬅️ Bosh menyu', callback_data: 'back_menu' }]
                ]
            }
        }).catch((err) => {
            // Agar video linki ishlamasa
            const fallbackMsg =
                `🎬 ${movie.nameUz}\n` +
                `📅 Yili: ${movie.year}\n` +
                `🎭 Janr: ${movie.genre}\n\n` +
                `Video yubora olmadim. Iltimos, @Laziz_2015_67 ga murojaat qiling.`;

            bot.sendMessage(chatId, fallbackMsg);
            console.error('Video yuborish xatosi:', err.message);
        });
    } catch (e) {
        bot.sendMessage(chatId, '❌ Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.');
        console.error('Xatolik:', e);
    }

    // Statistikani yangilash
    if (!isPremium) {
        user.downloadsThisWeek++;
    }
    saveUsers(users);

    const remaining = Math.max(0, user.freeBudget - user.downloadsThisWeek);
    if (!isPremium && remaining > 0) {
        bot.sendMessage(chatId, `✅ Kino yuborildi!\n📥 Bu hafta qolgan: ${remaining}`);
    }
});

// ========== EXPRESS ROUTES ==========

// Webhook endpoint
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Admin stats endpoint
app.get('/api/stats', (req, res) => {
    const users = readUsers();
    const movies = readMovies();

    const totalUsers = Object.keys(users).length;
    const premiumUsers = Object.values(users).filter(u =>
        u.plan === 'premium' && new Date(u.premiumExpires) > new Date()
    ).length;
    const totalMovies = Object.keys(movies).length;

    res.json({
        totalUsers,
        premiumUsers,
        totalMovies,
        timestamp: new Date()
    });
});

// ========== SERVER ==========

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\n🤖 Laziz Kino Bot ishga tushdi!`);
    console.log(`🔗 Webhook: ${botWebHookURL}`);
    console.log(`📊 Stats: http://localhost:${PORT}/api/stats`);
    console.log(`💚 Health: http://localhost:${PORT}/health`);
    console.log(`\n⏱️ ${new Date().toLocaleString('uz-UZ')}`);
    console.log(`────────────────────────────────\n`);
});

module.exports = { bot, app };