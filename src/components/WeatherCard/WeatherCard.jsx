import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOptionUrl = "";
  if (filteredOptions.length > 0) {
    weatherOptionUrl = filteredOptions[0]?.url;
  } else {
    weatherOptionUrl = weatherData.isDay
      ? defaultWeatherOptions.day.url
      : defaultWeatherOptions.night.url;
  }

  console.log(weatherOptionUrl);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOptionUrl}
        alt="weather"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
