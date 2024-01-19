interface WeatherButtonProps {
  onClick: () => void;
}

export const WeatherButton: React.FC<WeatherButtonProps> = (
  props: WeatherButtonProps,
) => (
  <button
    onClick={props.onClick}
    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
  >
    Get weather
  </button>
);
