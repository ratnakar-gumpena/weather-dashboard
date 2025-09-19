const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const tempToggle = document.getElementById('tempToggle');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const forecastContainer = document.getElementById('forecastContainer');
const apiKeySection = document.getElementById('apiKeySection');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');

let currentWeatherData = null;
let currentForecastData = null;
let isFahrenheit = false;
let userApiKey = null;

searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

tempToggle.addEventListener('change', (e) => {
    isFahrenheit = e.target.checked;
    if (currentWeatherData && currentForecastData) {
        displayCurrentWeather(currentWeatherData);
        displayForecast(currentForecastData);
    }
});

saveApiKeyBtn.addEventListener('click', saveApiKey);
apiKeyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveApiKey();
    }
});

function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
        showError('Please enter a valid API key');
        return;
    }

    userApiKey = apiKey;
    localStorage.setItem('openweatherApiKey', apiKey);
    apiKeySection.classList.add('hidden');
    showError('API key saved successfully! You can now search for weather data.');
}

function loadApiKey() {
    const savedKey = localStorage.getItem('openweatherApiKey');
    if (savedKey) {
        userApiKey = savedKey;
        apiKeySection.classList.add('hidden');
        return true;
    }
    return false;
}

async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    if (!userApiKey) {
        showError('Please configure your API key first');
        return;
    }

    try {
        showLoading();
        await Promise.all([
            getCurrentWeather(city),
            getForecast(city)
        ]);
    } catch (error) {
        showError('Failed to fetch weather data. Please check your API key and try again.');
        console.error('Weather API Error:', error);
    }
}

async function getCurrentWeather(city) {
    const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${userApiKey}&units=metric`
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    currentWeatherData = data;
    displayCurrentWeather(data);
}

async function getForecast(city) {
    const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${userApiKey}&units=metric`
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    currentForecastData = data;
    displayForecast(data);
}

function displayCurrentWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;

    const temperature = isFahrenheit ?
        Math.round((data.main.temp * 9/5) + 32) :
        Math.round(data.main.temp);

    const tempElement = document.getElementById('temp');
    tempElement.textContent = temperature;
    tempElement.parentElement.innerHTML = `<span id="temp">${temperature}</span>°${isFahrenheit ? 'F' : 'C'}`;

    condition.textContent = data.weather[0].description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = Math.round(data.wind.speed * 3.6);
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';

    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();

        if (!dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = {
                date: date,
                temps: [],
                conditions: [],
                humidity: [],
                windSpeed: []
            };
        }

        dailyForecasts[dateKey].temps.push(item.main.temp);
        dailyForecasts[dateKey].conditions.push(item.weather[0].description);
        dailyForecasts[dateKey].humidity.push(item.main.humidity);
        dailyForecasts[dateKey].windSpeed.push(item.wind.speed);
    });

    const forecastDays = Object.values(dailyForecasts).slice(0, 5);

    forecastDays.forEach((day, index) => {
        const avgTempCelsius = Math.round(
            day.temps.reduce((sum, temp) => sum + temp, 0) / day.temps.length
        );

        const avgTemp = isFahrenheit ?
            Math.round((avgTempCelsius * 9/5) + 32) :
            avgTempCelsius;

        const mostCommonCondition = getMostFrequent(day.conditions);

        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';

        const dateStr = index === 0 ? 'Today' :
                       index === 1 ? 'Tomorrow' :
                       day.date.toLocaleDateString('en-US', { weekday: 'long' });

        forecastItem.innerHTML = `
            <div class="forecast-date">${dateStr}</div>
            <div class="forecast-condition">${capitalizeWords(mostCommonCondition)}</div>
            <div class="forecast-temp">${avgTemp}°${isFahrenheit ? 'F' : 'C'}</div>
        `;

        forecastContainer.appendChild(forecastItem);
    });
}

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

function capitalizeWords(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function showLoading() {
    cityName.textContent = 'Loading...';
    temp.textContent = '--';
    condition.textContent = '--';
    humidity.textContent = '--';
    windSpeed.textContent = '--';
    forecastContainer.innerHTML = '<div class="loading">Loading forecast...</div>';
}

function showError(message) {
    forecastContainer.innerHTML = `<div class="error">${message}</div>`;
}

window.addEventListener('load', () => {
    if (!loadApiKey()) {
        showError('Please enter your OpenWeatherMap API key to get started');
    }
});