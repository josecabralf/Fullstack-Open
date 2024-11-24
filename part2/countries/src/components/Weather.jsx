export const Weather = ({ weather, city }) => {
    const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  
    return (
      <div>
        <h3>Weather in {city}</h3>
        <div><b>temperature:</b> {weather.main.temp}°C</div>
        <img src={iconUrl} alt={weather.weather[0].description} />
        <div><b>wind:</b> {weather.wind.speed} km/h</div>
      </div>
    );
  }