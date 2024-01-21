export async function fetchWeather(city: string, apiKey: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
  );
  const data = await response.json();
  const temperature = data.main.temp as number;
  const fetchedCity = data.name as string;
  if (!temperature || !fetchedCity) {
    throw new Error("Cannot fetch temperature");
  }
  return { temperature, city: fetchedCity };
}

export function kelvinToCelsius(degrees: number) {
  return degrees - 273.15;
}
