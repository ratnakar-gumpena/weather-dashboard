const express = require('express');
const router = express.Router();

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get current weather for a city
router.get('/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const { apikey, units = 'metric' } = req.query;

        // Validate required parameters
        if (!city) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'City parameter is required'
            });
        }

        if (!apikey) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'API key is required. Add ?apikey=YOUR_API_KEY to the request'
            });
        }

        // Fetch weather data from OpenWeatherMap
        const weatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apikey}&units=${units}`;
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            if (weatherResponse.status === 401) {
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Invalid API key provided'
                });
            }
            if (weatherResponse.status === 404) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `City "${city}" not found`
                });
            }
            throw new Error(`OpenWeatherMap API error: ${weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json();

        // Return simplified weather data - only temperature and feels_like
        res.json({
            temperature: weatherData.main.temp,
            feels_like: weatherData.main.feels_like
        });

    } catch (error) {
        console.error('Weather API Error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to fetch weather data'
        });
    }
});


module.exports = router;