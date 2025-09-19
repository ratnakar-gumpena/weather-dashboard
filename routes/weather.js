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

// Get 5-day forecast for a city
router.get('/forecast/:city', async (req, res) => {
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

        // Fetch forecast data from OpenWeatherMap
        const forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${apikey}&units=${units}`;
        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
            if (forecastResponse.status === 401) {
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Invalid API key provided'
                });
            }
            if (forecastResponse.status === 404) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `City "${city}" not found`
                });
            }
            throw new Error(`OpenWeatherMap API error: ${forecastResponse.status}`);
        }

        const forecastData = await forecastResponse.json();

        // Process forecast data into daily summaries
        const dailyForecasts = {};

        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateKey = date.toDateString();

            if (!dailyForecasts[dateKey]) {
                dailyForecasts[dateKey] = {
                    date: dateKey,
                    temps: [],
                    conditions: [],
                    humidity: [],
                    windSpeed: []
                };
            }

            dailyForecasts[dateKey].temps.push(item.main.temp);
            dailyForecasts[dateKey].conditions.push({
                main: item.weather[0].main,
                description: item.weather[0].description,
                icon: item.weather[0].icon
            });
            dailyForecasts[dateKey].humidity.push(item.main.humidity);
            dailyForecasts[dateKey].windSpeed.push(item.wind.speed);
        });

        // Format daily forecasts
        const formattedForecasts = Object.values(dailyForecasts).slice(0, 5).map(day => {
            const avgTemp = Math.round(
                day.temps.reduce((sum, temp) => sum + temp, 0) / day.temps.length
            );
            const mostCommonCondition = getMostFrequent(day.conditions.map(c => c.description));

            return {
                date: day.date,
                temperature: {
                    average: avgTemp,
                    unit: units === 'metric' ? 'C' : 'F'
                },
                condition: mostCommonCondition,
                humidity: Math.round(
                    day.humidity.reduce((sum, h) => sum + h, 0) / day.humidity.length
                ),
                windSpeed: Math.round(
                    day.windSpeed.reduce((sum, w) => sum + w, 0) / day.windSpeed.length
                )
            };
        });

        res.json({
            success: true,
            data: {
                city: forecastData.city.name,
                country: forecastData.city.country,
                forecasts: formattedForecasts,
                timestamp: new Date().toISOString(),
                source: 'OpenWeatherMap'
            }
        });

    } catch (error) {
        console.error('Forecast API Error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to fetch forecast data'
        });
    }
});

// Helper function to get most frequent item
function getMostFrequent(arr) {
    const frequency = {};
    let maxCount = 0;
    let mostFrequent = arr[0];

    arr.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
        if (frequency[item] > maxCount) {
            maxCount = frequency[item];
            mostFrequent = item;
        }
    });

    return mostFrequent;
}

module.exports = router;