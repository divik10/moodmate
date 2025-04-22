export interface WeatherData {
    temp: number
    condition: string
    icon: string
  }
  
  export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const apiKey = process.env.WEATHER_API_KEY
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
    const data = await response.json()
    
    return {
      temp: data.main.temp,
      condition: data.weather[0].main,
      icon: getWeatherIcon(data.weather[0].id)
    }
  }
  
  function getWeatherIcon(code: number): string {
    if (code >= 200 && code < 300) return "⛈️"
    if (code >= 300 && code < 600) return "🌧️"
    if (code >= 600 && code < 700) return "❄️"
    if (code === 800) return "☀️"
    if (code > 800) return "☁️"
    return "🌤️"
  }