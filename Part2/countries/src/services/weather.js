import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
const baseUrl = 'http://api.weatherapi.com'
// 'http://api.weatherapi.com'
// 'https://api.openweathermap.org'
// http://api.weatherapi.com/v1/current.json?key=c47f6981f3c6410e945121359232304&q=London&aqi=no

console.log(api_key);

const getWeather = (city) => {
    // const request = axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    const request = axios.get(`${baseUrl}/v1/current.json?key=c47f6981f3c6410e945121359232304&q=${city}&aqi=no`)
    return request.then(response => response.data)
}

export default { getWeather }