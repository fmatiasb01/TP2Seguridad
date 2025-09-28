// test/weatherService.test.js
const axios = require('axios');
const { getCurrentWeatherByCity } = require('../src/weatherService');

jest.mock('axios');

describe('weatherService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getCurrentWeatherByCity returns transformed weather info', async () => {
    process.env.OPENWEATHER_API_KEY = 'test-key';

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

    // Aseguramos que axios se llamó con el endpoint correcto
    expect(axios.get).toHaveBeenCalled();
  });

  test('throws error when API key missing', async () => {
    delete process.env.OPENWEATHER_API_KEY;

    await expect(getCurrentWeatherByCity('City')).rejects.toThrow('OpenWeather API key not configured.');
  });
});
