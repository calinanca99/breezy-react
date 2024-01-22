import { useEffect, useRef, useState } from "react";

import { WeatherButton } from "./components/WeatherButton";
import { WeatherDisplay } from "./components/WeatherDisplay";

import { fetchWeather, kelvinToCelsius } from "./utils/weatherUtils";

interface WeatherData {
  temperature: number;
  city: string;
}

function App() {
  const [inputCity, setInputCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // FIX: Cannot input city that contain 's'
      if (e.key === "s") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getWeather = async () => {
    try {
      const temperatureData = await fetchWeather(inputCity);
      const city = temperatureData.city;
      const temperature = kelvinToCelsius(temperatureData.temperature);

      setWeatherData({
        city,
        temperature,
      });
      setError(null);
    } catch (_) {
      setError(`Failed to get the temperature for: ${inputCity}.`);
      setWeatherData(null);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">Breezy React</h1>
        <input
          type="text"
          ref={inputRef}
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputCity) {
              getWeather();
            }
          }}
          className="mb-4 rounded border px-4 py-2"
          placeholder={`Click or press "s" to search`}
        ></input>
        <WeatherButton onClick={getWeather} city={inputCity} />
        {error ? (
          <p className="mt-4 text-red-500">{error}</p>
        ) : (
          weatherData && (
            <WeatherDisplay
              city={weatherData.city}
              temperature={weatherData.temperature}
            />
          )
        )}
      </div>
    </>
  );
}

export default App;
