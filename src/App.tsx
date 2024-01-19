import { useState } from "react";
import { WeatherButton } from "./components/WeatherButton";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { fetchWeather, kelvinToCelsius } from "./utils/weatherUtils";

interface TemperatureData {
  temperature: number;
}

function App() {
  const apiKey = "94eee5a6edbc745bb937c7bce6f7c36d";
  const city = "Groningen";

  const [weatherData, setWeatherData] = useState<TemperatureData | null>(null);

  const getWeather = async () => {
    console.log(apiKey);
    const data = await fetchWeather(city, apiKey);
    console.log(data);
    const temperatureData = {
      temperature: kelvinToCelsius(data.main.temp),
    } as TemperatureData;
    setWeatherData(temperatureData);
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">Breezy React</h1>
        <WeatherButton onClick={getWeather} />
        {weatherData && (
          <WeatherDisplay
            city="Groningen"
            temperature={weatherData.temperature}
          />
        )}
      </div>
    </>
  );
}

export default App;
