export async function fetchWeather(city: string, apiKey: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
  );
  return await response.json();
}

export function kelvinToCelsius(degrees: number) {
  return degrees - 273.15;
}
