const Weather = ({ weather }) => {
 
  if (weather) {
    const city = weather.location.name
    const temp = weather.current.temp_c
    const icon = weather.current.condition.icon
    const condition = weather.current.condition.text
    const wind = weather.current.wind_kph

    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>Temperature: {temp} Celsius</p>
        <img src={icon}></img>
        <p>{condition}</p>
        <p>Wind: {wind} k/h</p>
      </div>)
  }
}

export default Weather