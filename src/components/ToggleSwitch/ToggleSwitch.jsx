import { useContext } from 'react';
import './ToggleSwitch.css';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

export default function ToggleSwitch() {
  const { currentTemperatureUnit, setCurrentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  const isCelsius = currentTemperatureUnit === 'C';

  // Function to handle the toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === 'F' ? 'C' : 'F'));
  };

  return (
    <label className='toggle-switch'>
      <input
        type='checkbox'
        className='toggle-switch__checkbox'
        checked={isCelsius}
        onChange={handleToggleSwitchChange}
      />
      <span className='toggle-switch__circle'></span>
      <span
        style={{ color: !isCelsius ? 'white' : '' }}
        className='toggle-switch__text toggle-switch__text_F'
      >
        F
      </span>
      <span
        style={{ color: isCelsius ? 'white' : '' }}
        className='toggle-switch__text toggle-switch__text_C'
      >
        C
      </span>
    </label>
  );
}
