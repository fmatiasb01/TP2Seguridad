// src/index.js
const { getCurrentWeatherByCity } = require('./weatherService');

async function main() {
  const city = process.env.CITY || 'Buenos Aires';
  try {
    const weather = await getCurrentWeatherByCity(city);
    console.log(`Clima en ${weather.city}: ${weather.description}, ${weather.temp}°C`);
  } catch (err) {
    console.error('Error al obtener el clima:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
