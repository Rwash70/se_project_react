export const weatherOptions = [
  {
    day: true,
    condition: 'clear',
    url: new URL('../assets/day/day-sun.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'clouds',
    url: new URL('../assets/day/day-cloudy.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'rain',
    url: new URL('../assets/day/day-rain.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'storm',
    url: new URL('../assets/day/day-storm.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'snow',
    url: new URL('../assets/day/day-snow.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'fog',
    url: new URL('../assets/day/day-fog.svg', import.meta.url).href,
  },

  {
    day: false,
    condition: 'clear',
    url: new URL('../assets/night/night-sun.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'clouds',
    url: new URL('../assets/night/night-cloud.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'rain',
    url: new URL('../assets/night/night-rain.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'storm',
    url: new URL('../assets/night/night-storm.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'snow',
    url: new URL('../assets/night/night-snow.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'fog',
    url: new URL('../assets/night/night-fog.svg', import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL('../assets/day/default-day.svg', import.meta.url).href,
  },
  night: {
    url: new URL('../assets/night/default-night.svg', import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 33.77364,
  longitude: -84.380112,
};

export const APIkey = '9b75bbe34d355c4cc58fd739fc9c4b0b';
