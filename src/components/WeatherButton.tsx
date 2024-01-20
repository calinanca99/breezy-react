interface WeatherButtonProps {
  onClick: () => void;
  city: string;
}

export const WeatherButton: React.FC<WeatherButtonProps> = (
  props: WeatherButtonProps,
) => (
  <button
    onClick={props.onClick}
    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    disabled={!props.city}
  >
    Get weather
  </button>
);
