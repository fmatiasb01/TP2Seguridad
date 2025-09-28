// src/weatherService.js
const axios = require('axios');
const config = require('./config');

if (!config.openWeatherApiKey) {
  // No lanzar stack trace con la API key: sólo aviso claro
  console.warn('WARNING: OPENWEATHER_API_KEY is not set. The application will not be able to query the OpenWeather API.');
}

async function getCurrentWeatherByCity(city) {
  if (!config.openWeatherApiKey) {
    throw new Error('OpenWeather API key not configured.');
  }

  const url = `${config.openWeatherBaseUrl}/weather`;
  const params = {
    q: city,
    appid: config.openWeatherApiKey,
    units: 'metric'
  };

  const response = await axios.get(url, { params, timeout: 5000 });
  // Devolver sólo lo necesario para evitar filtrar datos sensibles
  const { name, weather, main } = response.data;
  return {
    city: name,
    description: weather && weather[0] ? weather[0].description : null,
    temp: main ? main.temp : null
  };
}

module.exports = {
  getCurrentWeatherByCity
};
