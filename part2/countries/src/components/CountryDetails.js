import { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';

const CountryDetails = ({ country }) => {
  const name = country.name.common;
  const capital = country.capital;
  const area = country.area;
  const languages = country.languages;
  const flag = country.flags.png;
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];
  const key = process.env.REACT_APP_WEATHER_API_KEY;
  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

  const [weather, setWeather] = useState();

  useEffect(() => {
    axios.get(openWeatherUrl).then(({ data }) => setWeather(data));
  }, [openWeatherUrl]);

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img src={flag} alt={`Flag of ${name}`} />
      </div>
      {weather && <Weather city={capital} weather={weather} />}
    </div>
  );
};

export default CountryDetails;
