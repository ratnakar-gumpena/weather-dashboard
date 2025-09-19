# Weather Dashboard API

This API provides weather data endpoints for external applications to fetch current weather and forecast information.

## Base URL
- Local Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication
All API endpoints require an OpenWeatherMap API key passed as a query parameter.

## Endpoints

### Get Current Weather

**GET** `/api/weather/:city`

Fetch current weather data for a specific city.

#### Parameters
- `city` (path parameter, required): Name of the city
- `apikey` (query parameter, required): Your OpenWeatherMap API key
- `units` (query parameter, optional): Temperature units (`metric` for Celsius, `imperial` for Fahrenheit). Default: `metric`

#### Example Request
```bash
GET /api/weather/London?apikey=YOUR_API_KEY&units=metric
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "city": "London",
    "country": "GB",
    "temperature": {
      "current": 15.5,
      "feels_like": 14.2,
      "min": 12.0,
      "max": 18.0,
      "unit": "C"
    },
    "weather": {
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    },
    "humidity": 72,
    "pressure": 1013,
    "wind": {
      "speed": 3.6,
      "direction": 250
    },
    "visibility": 10000,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "source": "OpenWeatherMap"
  }
}
```

### Get 5-Day Forecast

**GET** `/api/forecast/:city`

Fetch 5-day weather forecast for a specific city.

#### Parameters
- `city` (path parameter, required): Name of the city
- `apikey` (query parameter, required): Your OpenWeatherMap API key
- `units` (query parameter, optional): Temperature units (`metric` for Celsius, `imperial` for Fahrenheit). Default: `metric`

#### Example Request
```bash
GET /api/forecast/London?apikey=YOUR_API_KEY&units=metric
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "city": "London",
    "country": "GB",
    "forecasts": [
      {
        "date": "Mon Jan 15 2024",
        "temperature": {
          "average": 16,
          "unit": "C"
        },
        "condition": "scattered clouds",
        "humidity": 68,
        "windSpeed": 4
      }
    ],
    "timestamp": "2024-01-15T10:30:00.000Z",
    "source": "OpenWeatherMap"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "City parameter is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid API key provided"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "City \"InvalidCity\" not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Failed to fetch weather data"
}
```

## Usage Examples

### JavaScript/Fetch
```javascript
const response = await fetch('/api/weather/London?apikey=YOUR_API_KEY');
const data = await response.json();
console.log(data);
```

### cURL
```bash
curl "http://localhost:3000/api/weather/London?apikey=YOUR_API_KEY"
```

### Salesforce Apex
```apex
HttpRequest req = new HttpRequest();
req.setEndpoint('https://your-domain.com/api/weather/London?apikey=YOUR_API_KEY');
req.setMethod('GET');
Http http = new Http();
HttpResponse res = http.send(req);
String responseBody = res.getBody();
```

## CORS Configuration
The API is configured to accept requests from any origin (`*`) to support external applications like Salesforce, mobile apps, etc.

## Rate Limiting
Rate limiting depends on your OpenWeatherMap API plan. The free tier allows 60 calls per minute.

## Health Check
**GET** `/health` - Check if the API server is running
```json
{
  "status": "OK",
  "message": "Weather Dashboard API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```