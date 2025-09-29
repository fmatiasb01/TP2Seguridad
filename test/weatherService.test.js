// test/weatherService.test.js
const axios = require('axios');
jest.mock('axios');

describe('weatherService', () => {
  afterEach(() => {
    jest.resetAllMocks();
    // limpiar variables para no contaminar otros tests
    delete process.env.OPENWEATHER_API_KEY;
  });

  test('getCurrentWeatherByCity returns transformed weather info', async () => {
    // Establecemos la API key de prueba ANTES de requerir el módulo
    process.env.OPENWEATHER_API_KEY = 'test-key';

    // Ahora require el módulo que usa process.env
    const { getCurrentWeatherByCity } = require('../src/weatherService');

    const fakeResponse = {
      data: {
        name: 'Test City',
        weather: [{ description: 'clear sky' }],
        main: { temp: 22.5 }
      }
    };

    axios.get.mockResolvedValueOnce(fakeResponse);

    const result = await getCurrentWeatherByCity('Test City');

    expect(result).toEqual({
      city: 'Test City',
      description: 'clear sky',
      temp: 22.5
    });

    expect(axios.get).toHaveBeenCalled();
  });

  test('throws error when API key missing', async () => {
    // Aseguramos que la variable NO está presente
    delete process.env.OPENWEATHER_API_KEY;

    // Re-require del módulo para reflejar el nuevo estado
    jest.resetModules();
    const { getCurrentWeatherByCity } = require('../src/weatherService');

    await expect(getCurrentWeatherByCity('City')).rejects.toThrow('OpenWeather API key not configured.');
  });
});
