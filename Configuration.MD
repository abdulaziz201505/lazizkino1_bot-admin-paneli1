// movies-generator.js
// Bu skript 1000 ta kino uchun random ma'lumotlar yaratadi

const fs = require('fs');

const ozbekNames = [
  'Qahramonlar', 'Sevgi Tarikhi', 'Shahzoda Oqibati', 'Sarguzasht', 
  'Qo\'rquv Shahari', 'Odam Qalbiga', 'Mohirlik', 'Shuhrat',
  'Fajrning Nur', 'Tun Sayrovi', 'Bahorning Kuni', 'Yozning Issi',
  'Kostraning Shodligi', 'Qishning Qorasi'
];

const englishNames = [
  'The Legend', 'Love Story', 'Prince Tale', 'Adventure Time',
  'Fear City', 'Human Heart', 'Magic', 'Glory', 'Morning Light',
  'Night Walk', 'Spring Day', 'Hot Summer', 'Autumn Joy', 'White Winter'
];

const genres = ['Drama', 'Comedy', 'Action', 'Horror', 'Romance', 'Adventure', 'Mystery', 'Thriller'];

const descriptions = [
  'Hayotning kuzelmalarini aytadigan kino',
  'Sevgi va hayotning o\'ziga xos tarikhi',
  'Qahramonchasining sarguzashtini ko\'rgan tarix',
  'Insonning ichki dunyasini aylantirib ko\'rsatdi',
  'Qo\'ngirog\'ik va oq yalgiz kunlarni aytadi',
  'Qayd etiluvchi umumiy voqea-hodisalar'
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMovies() {
  const movies = {};

  for (let i = 1; i <= 1000; i++) {
    const code = String(i).padStart(3, '0');
    const year = 2020 + Math.floor(Math.random() * 5);
    const duration = 90 + Math.floor(Math.random() * 90);
    
    movies[code] = {
      code: code,
      nameUz: `${getRandomItem(ozbekNames)} ${code}`,
      nameEn: `${getRandomItem(englishNames)} ${code}`,
      desc: getRandomItem(descriptions),
      year: String(year),
      genre: getRandomItem(genres),
      url: `https://example.com/movies/${code}.mp4`,
      poster: `https://example.com/posters/${code}.jpg`,
      duration: String(duration),
      createdAt: new Date().toISOString()
    };
  }

  // Faylga yozish
  fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2));
  console.log('✅ 1000 ta kino ma\'lumoti yaratildi!');
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
      freeBudget: 1,
      premiumExpires: null,
      joinDate: new Date().toISOString(),
      downloadsThisWeek: 0,
      lastReset: new Date().toISOString()
    },
    '987654321': {
      chatId: 987654321,
      username: 'premiumuser',
      plan: 'premium',
      freeBudget: 1,
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
console.log('Kinolarni admin paneldan ko\'rishingiz mumkin');