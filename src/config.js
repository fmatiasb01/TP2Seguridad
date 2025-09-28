// src/config.js
require('dotenv').config();

const config = {
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY || null,
  openWeatherBaseUrl: process.env.OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5'
};

module.exports = config;
