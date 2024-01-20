import { capitalize } from "../utils/stringUtils";

interface WeatherDisplayProps {
  city: string;
  temperature: number;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = (
  props: WeatherDisplayProps,
) => (
  <div className="mt-4">
    <p>
      <strong>City:</strong> {capitalize(props.city)}
    </p>
    <p>
      <strong>Temperature:</strong> {props.temperature.toFixed(0)}°C
    </p>
  </div>
);
