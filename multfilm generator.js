// multfilm-generator.js
// Bu skript 1000 ta multfilm uchun random ma'lumotlar yaratadi

const fs = require('fs');

const ozbekNames = [
    'Qush Dostlar', 'Sarguzasht', 'Qahraman Bolalar', 'Yulduzli Oqibat',
    'Shusha Sirlari', 'Yangi Dunyo', 'Qalbimning Ovozi', 'Bahor Rang',
    'Sevgi Darslariy', 'Bog\'ning Xazinasi', 'Uchishning Sirri', 'Doremoni Dunyo',
    'Samolyor Sarguzashti', 'Samandar Safarlari', 'Bolaning Orzulari'
];

const englishNames = [
    'Happy Friends', 'Adventure Time', 'Magic World', 'Star Quest',
    'Secret Mystery', 'New Worlds', 'Heart Song', 'Spring Colors',
    'Lesson of Love', 'Garden Treasure', 'Flying Secret', 'Dora\'s World',
    'Plane Adventure', 'Salamander Stories', 'Child\'s Dream'
];

const genres = ['Sarguzasht', 'Komediya', 'Sevgi', 'Fantastika', 'Tarixiy', 'Saxt'];

const descriptions = [
    'Bolalar uchun vesalim multfilm - qiziq va o\'ziga xoslantirilgan',
    'Sevgi, do\'stlik va haqqiqat haqidagi qiziq hikoya',
    'Qahramonchasining sarguzashtini ko\'rganda xoshi bo\'lasiz',
    'Insonning ichki dunyasini aylantirib ko\'radi - sevimli multfilm',
    'Qo\'ngirog\'ik va oq yalgiz kunlarni ko\'radigan qiziq hikoya',
    'Bolalarni xunuklatadigan va o\'yiga soluvchi kontent'
];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateMovies() {
    const movies = {};

    for (let i = 1; i <= 1000; i++) {
        const code = String(i).padStart(3, '0');
        const year = 2018 + Math.floor(Math.random() * 6);
        const duration = 15 + Math.floor(Math.random() * 30); // Multfilm odatda 15-45 minut

        movies[code] = {
            code: code,
            nameUz: `${getRandomItem(ozbekNames)} ${code}`,
            nameEn: `${getRandomItem(englishNames)} ${code}`,
            desc: getRandomItem(descriptions),
            year: String(year),
            genre: getRandomItem(genres),
            url: `https://example.com/cartoons/${code}.mp4`,
            poster: `https://example.com/posters/${code}.jpg`,
            duration: String(duration),
            createdAt: new Date().toISOString()
        };
    }

    // Faylga yozish
    fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2));
    console.log('✅ 1000 ta multfilm ma\'lumoti yaratildi!');
    console.log('📁 Fayl: movies.json');
    console.log('💾 O\'lcham:', fs.statSync('movies.json').size, 'bytes');
}

// Foydalanuvchi ma\'lumotlari templates
function generateUsers() {
    const users = {
        '123456789': {
            chatId: 123456789,
            username: 'testuser1',
            plan: 'free',
            freeBudget: 2,
            premiumExpires: null,
            joinDate: new Date().toISOString(),
            downloadsThisWeek: 0,
            lastReset: new Date().toISOString()
        },
        '987654321': {
            chatId: 987654321,
            username: 'premiumuser',
            plan: 'premium',
            freeBudget: 2,
            premiumExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            joinDate: new Date().toISOString(),
            downloadsThisWeek: 5,
            lastReset: new Date().toISOString()
        }
    };

    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    console.log('✅ Test foydalanuvchilar yaratildi!');
}

// Faqlni yaratish
generateMovies();
generateUsers();

console.log('\n📊 ISHLANDI!');
console.log('🎨 Multfilm-larni admin paneldan ko\'rishingiz mumkin');
console.log('\n👶 BOLALAR UCHUN XAVFSIZ BOT TAYYOR!');.