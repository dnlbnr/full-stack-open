const Weather = ({ city, weather }) => {
  const tempterature = weather.main.temp;
  const wind = weather.wind.speed;
  const iconCode = weather.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature {tempterature} Celcius</p>
      <div>
        <img src={iconUrl} alt='Weather Icon' />
      </div>
      <p>Wind {wind} m/s</p>
    </div>
  );
};

export default Weather;
