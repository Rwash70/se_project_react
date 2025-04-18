import './WeatherCard.css';
import { weatherOptions, defaultWeatherOptions } from '../../utils/constants';
import { useContext } from 'react';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOptionUrl = '';
  if (filteredOptions.length > 0) {
    weatherOptionUrl = filteredOptions[0]?.url;
  } else {
    weatherOptionUrl = weatherData.isDay
      ? defaultWeatherOptions.day.url
      : defaultWeatherOptions.night.url;
  }

  return (
    <section className='weather-card'>
      <div className='weather-card__temp'>
        {weatherData.temp[currentTemperatureUnit]} {currentTemperatureUnit}
      </div>
      <img
        src={weatherOptionUrl}
        alt='weather'
        className='weather-card__image'
      />
    </section>
  );
}

export default WeatherCard;
