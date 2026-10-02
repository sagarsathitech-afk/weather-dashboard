import { useEffect, useMemo, useState } from 'react'

const DEFAULT_CITY = 'New York'

const WEATHER_CODES = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Heavy drizzle', icon: '🌧️' },
  56: { label: 'Freezing drizzle', icon: '🌧️' },
  57: { label: 'Heavy freezing drizzle', icon: '🌧️' },
  61: { label: 'Slight rain', icon: '🌦️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  66: { label: 'Freezing rain', icon: '🌧️' },
  67: { label: 'Heavy freezing rain', icon: '🌧️' },
  71: { label: 'Light snow', icon: '🌨️' },
  73: { label: 'Snow', icon: '❄️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  77: { label: 'Snow grains', icon: '❄️' },
  80: { label: 'Rain showers', icon: '🌦️' },
  81: { label: 'Heavy rain showers', icon: '🌧️' },
  82: { label: 'Violent rain showers', icon: '⛈️' },
  85: { label: 'Snow showers', icon: '🌨️' },
  86: { label: 'Heavy snow showers', icon: '❄️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm with hail', icon: '⛈️' },
  99: { label: 'Severe thunderstorm', icon: '⛈️' }
}

function formatDate(dateString, options) {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString))
}

function getWeatherMeta(code) {
  return WEATHER_CODES[code] || { label: 'Weather', icon: '🌤️' }
}

function getLocationInfo(location) {
  if (!location) return '—'
  const parts = [location.name, location.admin1, location.country]
    .filter(Boolean)
    .slice(0, 3)
  return parts.join(', ')
}

async function fetchCity(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Could not find that city.')
  const data = await res.json()

  if (!data.results || data.results.length === 0) {
    throw new Error('Could not find that city.')
  }

  const result = data.results[0]
  return {
    name: result.name,
    country: result.country,
    admin1: result.admin1,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone || 'auto'
  }
}

async function fetchWeather({ latitude, longitude, timezone }) {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', latitude)
  url.searchParams.set('longitude', longitude)
  url.searchParams.set('timezone', timezone || 'auto')
  url.searchParams.set('current', 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,precipitation')
  url.searchParams.set('hourly', 'temperature_2m,precipitation_probability,weather_code')
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset')
  url.searchParams.set('forecast_days', '5')

  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather data is temporarily unavailable.')

  return res.json()
}

function App() {
  const [cityInput, setCityInput] = useState(DEFAULT_CITY)
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchWeatherForCity = async (query) => {
    try {
      setLoading(true)
      setError('')

      const city = await fetchCity(query)
      const data = await fetchWeather(city)

      setLocation(city)
      setWeather(data)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherForCity(DEFAULT_CITY)
  }, [])

  const current = weather?.current
  const hourly = weather?.hourly
  const daily = weather?.daily

  const summary = useMemo(() => {
    if (!current) return null
    const code = current.weather_code
    const meta = getWeatherMeta(code)
    return `${meta.icon} ${meta.label}`
  }, [current])

  const nextHours = useMemo(() => {
    if (!hourly) return []
    const times = hourly.time.slice(0, 8)
    return times.map((time, i) => ({
      time,
      temp: hourly.temperature_2m[i],
      pop: hourly.precipitation_probability[i],
      code: hourly.weather_code[i]
    }))
  }, [hourly])

  const weeklyForecast = useMemo(() => {
    if (!daily) return []
    return daily.time.map((day, index) => ({
      day,
      min: daily.temperature_2m_min[index],
      max: daily.temperature_2m_max[index],
      pop: daily.precipitation_probability_max[index],
      code: daily.weather_code[index],
      sunrise: daily.sunrise[index],
      sunset: daily.sunset[index]
    }))
  }, [daily])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!cityInput.trim()) return
    fetchWeatherForCity(cityInput.trim())
  }

  return (
    <div className="app-shell">
      <aside className="sidebar glass">
        <div className="logo-block">
          <div className="logo">☁️</div>
          <div>
            <p className="eyebrow">Weather</p>
            <h1>Forecast</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="search-box">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Search city"
            aria-label="Search city"
          />
          <button type="submit">Search</button>
        </form>

        {error && <div className="error-banner">{error}</div>}

        {location && (
          <div className="location-card">
            <p className="label">Location</p>
            <h2>{location.name}</h2>
            <span>{getLocationInfo(location)}</span>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading weather data…</div>
        ) : current && (
          <div className="current-card glass-soft">
            <div className="temp-row">
              <div className="temp-value">{Math.round(current.temperature_2m)}°</div>
              <div className="weather-icon">{getWeatherMeta(current.weather_code).icon}</div>
            </div>

            <div className="summary">{summary}</div>

            <div className="metrics-grid">
              <div>
                <span className="label">Feels like</span>
                <strong>{Math.round(current.apparent_temperature)}°</strong>
              </div>
              <div>
                <span className="label">Humidity</span>
                <strong>{Math.round(current.relative_humidity_2m)}%</strong>
              </div>
              <div>
                <span className="label">Wind</span>
                <strong>{Math.round(current.wind_speed_10m)} km/h</strong>
              </div>
              <div>
                <span className="label">Rain</span>
                <strong>{Math.round(current.precipitation)} mm</strong>
              </div>
            </div>
          </div>
        )}
      </aside>

      <main className="main-panel">
        <section className="topbar glass">
          <div>
            <p className="eyebrow">Today</p>
            <h3>{location ? getLocationInfo(location) : 'Weather overview'}</h3>
          </div>
          <div className="status-pill">Live update</div>
        </section>

        <section className="section">
          <div className="section-header">
            <h4>Next 8 hours</h4>
          </div>
          <div className="hourly-grid">
            {nextHours.map((item) => (
              <div className="hour-card glass-soft" key={item.time}>
                <span className="time">{formatDate(item.time, { hour: 'numeric' })}</span>
                <div className="hour-icon">{getWeatherMeta(item.code).icon}</div>
                <strong>{Math.round(item.temp)}°</strong>
                <small>{item.pop}% rain</small>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h4>5-day forecast</h4>
          </div>
          <div className="forecast-list">
            {weeklyForecast.map((item) => (
              <div className="forecast-row glass-soft" key={item.day}>
                <div className="day-name">{formatDate(item.day, { weekday: 'short' })}</div>
                <div className="forecast-main">
                  <span className="forecast-icon">{getWeatherMeta(item.code).icon}</span>
                  <span>{getWeatherMeta(item.code).label}</span>
                </div>
                <div className="forecast-temp">
                  <span>{Math.round(item.max)}°</span>
                  <span className="min">{Math.round(item.min)}°</span>
                </div>
                <div className="forecast-rain">{item.pop}%</div>
                <div className="forecast-sun">
                  <span>☀ {formatDate(item.sunrise, { hour: 'numeric', minute: '2-digit' })}</span>
                  <span>🌙 {formatDate(item.sunset, { hour: 'numeric', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
