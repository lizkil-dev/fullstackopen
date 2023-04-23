const Country = ({country}) => {


const countryName = country.name.common
const capital = country.capital
const area = country.area
const languages = country.languages
const lanArr = Object.entries(languages)
const flag = country.flags.png

return (
  <div>
    <h1>{countryName}</h1>
    <p>Capital: {capital}</p>
    <p>Area: {area}</p>
    <h3>Languages</h3>
    <ul>
      {lanArr.map((el, i) => <li key={i}>{el[1]}</li>)}
    </ul>
    <img src={flag} alt="Country flag"></img>
  </div>)
  
}

export default Country