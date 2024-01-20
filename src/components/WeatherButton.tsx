interface WeatherButtonProps {
  onClick: () => void;
  city: string;
}

export const WeatherButton: React.FC<WeatherButtonProps> = (
  props: WeatherButtonProps,
) => (
  <button
    onClick={props.onClick}
    className={`rounded px-4 py-2 font-bold text-white
                ${props.city ? "bg-blue-500 hover:bg-blue-700" : "cursor-not-allowed bg-gray-400"}`}
    disabled={!props.city}
  >
    Get weather
  </button>
);
