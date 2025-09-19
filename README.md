# Weather Dashboard

A modern, responsive weather dashboard built with HTML, CSS, and JavaScript that provides current weather conditions and 5-day forecasts for any city worldwide.

🌐 **Live Demo**: [https://main.d2csde3gfk3zd7.amplifyapp.com](https://main.d2csde3gfk3zd7.amplifyapp.com)

## Features

- **Current Weather Display**: Shows temperature, weather condition, humidity, and wind speed
- **5-Day Forecast**: Displays upcoming weather predictions
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **User API Key Input**: Secure way to enter your own OpenWeatherMap API key
- **Local Storage**: API key persists across browser sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## Getting Started

### Quick Start (Live Demo)

1. Visit the live demo: [https://main.d2csde3gfk3zd7.amplifyapp.com](https://main.d2csde3gfk3zd7.amplifyapp.com)
2. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
3. Enter your API key in the app and start searching for weather data!

### Local Development

#### Prerequisites

- A web browser
- OpenWeatherMap API key (free registration required)

#### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ratnakar-gumpena/weather-dashboard.git
   cd weather-dashboard
   ```

2. Get your free API key:
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

3. Open `index.html` in your web browser

## Usage

1. **First Time Setup**: Enter your OpenWeatherMap API key when prompted
2. **Search Weather**: Enter a city name in the search box
3. **Get Results**: Click "Search" or press Enter to view current weather and 5-day forecast
4. **Toggle Units**: Use the switch to change between Celsius and Fahrenheit
5. **Persistent Key**: Your API key is saved locally and will persist across sessions

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