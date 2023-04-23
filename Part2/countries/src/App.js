import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import Weather from './components/Weather'
import countryService from './services/countries'
import weatherService from './services/weather'



const App = () => {
  const [result, setResult] = useState([])
  const [countries, setCountries] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [newFilter, setNewFilter] = useState([])
  const [weather, setWeather] = useState('')

  
  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const handleFilterChange = (event) => {    
    setNewFilter(event.target.value)   
  }

  useEffect(() => {
    const allCountries = countries.map(el => el.name.common.toLowerCase())
    const searchResult = allCountries.filter(el => el.includes(newFilter.toLowerCase())).sort()
    setResult(searchResult)      
    setWeather('')
    setErrorMessage('')
  }, [newFilter])
  
  const singleCountry = countries.filter(el => el.name.common.toLowerCase() == result)[0]

  useEffect(() => {
    if(singleCountry){
    weatherService
      // .getWeather(singleCountry.capitalInfo.latlng[0], singleCountry.capitalInfo.latlng[1])
      .getWeather(singleCountry.capital)
      .then(response => {
        setWeather(response)
      })
    }
  }, [singleCountry])
  
  useEffect(() => {
    if(result.length > 10){
      setErrorMessage('Too many matches, specify another filter')
    }else {
      setErrorMessage('')
    }    
  }, [result])
 
  console.log(newFilter.length);
  return (
    <div>
      <h1>Countries</h1>
      <Filter value={newFilter} onChange={handleFilterChange}/>        
      <Countries result={result} message={errorMessage} setResult={setResult} singleCountry={singleCountry} setErrorMessage={setErrorMessage}/> 
      <Weather weather={weather} />
    </div>
  )
}

export default App