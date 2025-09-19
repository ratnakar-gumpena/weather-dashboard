# Weather Dashboard

A modern, responsive weather dashboard built with HTML, CSS, and JavaScript that provides current weather conditions and 5-day forecasts for any city worldwide.

## Features

- **Current Weather Display**: Shows temperature, weather condition, humidity, and wind speed
- **5-Day Forecast**: Displays upcoming weather predictions
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## Screenshots

![Weather Dashboard](screenshot.png)

## Getting Started

### Prerequisites

- A web browser
- OpenWeatherMap API key (free registration required)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ratnakar-gumpena/weather-dashboard.git
   cd weather-dashboard
   ```

2. Get your free API key:
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

3. Configure the API key:
   - Open `script.js`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key:
     ```javascript
     const API_KEY = 'your_actual_api_key_here';
     ```

4. Open `index.html` in your web browser

## Usage

1. Enter a city name in the search box
2. Click the "Search" button or press Enter
3. View current weather conditions and 5-day forecast
4. Use the toggle switch to switch between Celsius and Fahrenheit

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: API integration and dynamic functionality
- **OpenWeatherMap API**: Weather data source

## File Structure

```
weather-dashboard/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## API Reference

This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data:

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- Icons and design inspiration from modern weather applications