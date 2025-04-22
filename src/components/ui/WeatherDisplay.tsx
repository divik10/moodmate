'use client';

import { useEffect, useState } from 'react';

export default function WeatherDisplay() {
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
    icon: string;
  } | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = '986a3139a59f3cd3d3e1668cf548f8ac';
        const city = 'London';
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();

        if (!res.ok) {
          console.error('Failed to fetch weather:', data.message);
          return;
        }

        setWeather({
          temp: data.main.temp,
          condition: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) return null;

  return (
    <div className="flex items-center space-x-4 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-800 dark:to-blue-800 px-6 py-3 rounded-xl shadow-md transition-all">
      <img src={weather.icon} alt={weather.condition} className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-gray-800 dark:text-white">
          {Math.round(weather.temp)}°C
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
          {weather.condition}
        </span>
      </div>
    </div>
  );
}
