import { useState } from "react";

import { WeatherButton } from "./components/WeatherButton";
import { WeatherDisplay } from "./components/WeatherDisplay";

import { fetchWeather, kelvinToCelsius } from "./utils/weatherUtils";
import { capitalize } from "./utils/stringUtils";

function App() {
  const apiKey = "94eee5a6edbc745bb937c7bce6f7c36d";

  const [inputCity, setInputCity] = useState("");
  const [displayedCity, setDisplayedCity] = useState("");

  const [temperature, setTemperature] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  const getWeather = async () => {
    try {
      const temperatureData = kelvinToCelsius(
        await fetchWeather(inputCity, apiKey),
      );
      setTemperature(temperatureData);
      setDisplayedCity(inputCity);
      setError(null);
    } catch (error) {
      setError(`Failed to get the temperature for: ${inputCity}.`);
      setTemperature(null);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">Breezy React</h1>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          className="mb-4 rounded border px-4 py-2"
          placeholder="Groningen"
        ></input>
        <WeatherButton onClick={getWeather} city={inputCity} />
        {error ? (
          <p className="mt-4 text-red-500">{error}</p>
        ) : (
          temperature &&
          displayedCity && (
            <WeatherDisplay
              city={capitalize(displayedCity)}
              temperature={temperature}
            />
          )
        )}
      </div>
    </>
  );
}

export default App;
