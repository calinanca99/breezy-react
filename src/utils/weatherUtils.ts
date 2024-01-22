export async function fetchWeather(city: string) {
  const endpoint = import.meta.env.VITE_API_ENDPOINT;
  const response = await fetch(`${endpoint}/weather/${city}`);

  const data = await response.json();
  const temperature = data.temperature as number;
  const fetchedCity = data.name as string;

  if (!temperature || !fetchedCity) {
    throw new Error("Cannot fetch temperature");
  }

  return { temperature, city: fetchedCity };
}

export function kelvinToCelsius(degrees: number) {
  return degrees - 273.15;
}
