export interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
}

export interface Entry {
  id?: string
  userId: string
  date: string
  mood: string
  note: string
  weather: {
    temp: number
    condition: string
  }
}

export interface WeatherData {
  temp: number
  condition: string
  icon: string
}