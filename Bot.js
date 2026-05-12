require('dotenv').config();

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// ================= TOKEN =================
const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN || TOKEN === 'YOUR_BOT_TOKEN_HERE') {
    console.error('❌ BOT_TOKEN topilmadi! .env faylini tekshiring.');
    process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

const app = express();
app.use(express.json());

const moviesFile = path.join(__dirname, 'movies.json');
const usersFile = path.join(__dirname, 'users.json');

// ================= FILE FUNCTIONS =================
function readJSON(file, fallback = {}) {
    try {
        if (fs.existsSync(file)) {
            return JSON.parse(fs.readFileSync(file, 'utf8'));
        }
    } catch (e) {
        console.error(`❌ Fayl o'qishda xato (${file}):`, e.message);
    }
    return fallback;
}

function saveJSON(file, data) {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(`❌ Fayl saqlashda xato (${file}):`, e.message);
    }
}

// ================= START =================
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    let users = readJSON(usersFile);

    if (!users[userId]) {
        users[userId] = {
            chatId,
            username: msg.from.username || 'Anonim',
            plan: 'free',
            freeLimit: 2,
            used: 0,
            joinDate: new Date().toISOString(),
            lastReset: new Date().toISOString(),
            premiumExpire: null
        };
        saveJSON(usersFile, users);
    }

    bot.sendMessage(chatId,
        `👋 Xush kelibsiz!\n\n🎬 Kino Bot\n\n🆓 Free: 2 ta kino\n👑 Premium: Cheksiz\n\nKino kodini yuboring (1-1000)`,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '❓ Yordam', callback_data: 'help' }]
                ]
            }
        }
    );
});

// ================= CALLBACK =================
bot.on('callback_query', (q) => {
    const chatId = q.message.chat.id;
    bot.answerCallbackQuery(q.id);

    if (q.data === 'help') {
        bot.sendMessage(chatId,
            `❓ Yordam:\n\n- Kino kod yuboring (1-1000)\n- /start — qayta boshlash`
        );
    }
});

// ================= MESSAGE =================
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text || text.startsWith('/')) return;

    const users = readJSON(usersFile);
    const user = users[msg.from.id];

    if (!user) {
        return bot.sendMessage(chatId, '⚠️ Iltimos, /start ni bosing.');
    }

    const code = parseInt(text);

    if (isNaN(code) || code < 1 || code > 1000) {
        return bot.sendMessage(chatId, '❌ Faqat 1-1000 orasidagi son yuboring.');
    }

    // Haftalik reset
    const now = new Date();
    const last = new Date(user.lastReset);

    if ((now - last) > 7 * 24 * 60 * 60 * 1000) {
        user.used = 0;
        user.lastReset = now.toISOString();
    }

    const isPremium = user.premiumExpire && new Date(user.premiumExpire) > now;

    if (!isPremium && user.used >= user.freeLimit) {
        return bot.sendMessage(chatId,
            `❌ Limit tugadi!\n\n👑 Premium oling cheksiz kinolar uchun.\n\nQolgan: ${user.freeLimit - user.used}/${user.freeLimit}`
        );
    }

    // Kinoni yuborish
    const movies = readJSON(moviesFile);

    if (movies[code]) {
        // Agar movies.json da mavjud bo'lsa
        bot.sendMessage(chatId, `🎬 Kino #${code}: ${movies[code]}`);
    } else {
        bot.sendMessage(chatId,
            `🎬 Kino #${code}\n\n❌ Bu kod bo'yicha kino topilmadi (demo rejim)`
        );
    }

    if (!isPremium) {
        user.used++;
        bot.sendMessage(chatId,
            `📊 Qolgan urinishlar: ${user.freeLimit - user.used}/${user.freeLimit}`
        );
    }

    users[msg.from.id] = user;
    saveJSON(usersFile, users);
});

// ================= POLLING ERROR =================
bot.on('polling_error', (error) => {
    console.error('🔴 Polling xatosi:', error.message);
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Bot ishga tushdi! Server port: ${PORT}`);
});