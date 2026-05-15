export interface WeatherData {
  temp: number
  isDay: boolean
  localTime: string
  timezone: string
}

export async function fetchWeather(lat: number, lng: number, timezone: string): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    current: 'temperature_2m,is_day',
    timezone,
  })

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!res.ok) throw new Error(`Open-Meteo error: ${res.status}`)

  const data = await res.json()
  return {
    temp: Math.round(data.current.temperature_2m),
    isDay: data.current.is_day === 1,
    localTime: data.current.time,
    timezone: data.timezone,
  }
}
