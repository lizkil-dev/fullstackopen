import Country from "./Country"


const Countries = ({ result, message, setResult, singleCountry }) => {

 
 
  const showCountry = (event) => {
    setResult([event.target.name])
  }

  if (result.length === 0){
    return (
      <></>
    )
  }else if (result.length > 10) {
    
    return (
      <>
        <h2>{message}</h2>
      </>
    )
  } else if (result.length > 1) {
    return (
      <ul>
        {result.map((el, i) => 
        <span key={i}><li >{el.charAt(0).toUpperCase() + el.slice(1)}<button name={el} onClick={showCountry}>show</button></li></span>
        )}
      </ul>
    )
  } else  {
    return (
      <>
      <Country country={singleCountry}/>
      </>
    )
  }
}
export default Countries