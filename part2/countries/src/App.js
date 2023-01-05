import {useEffect, useState} from 'react'
import  axios from 'axios'

const RenderCountries = (props) => {

  const[components, setComponent] = useState([''])

  const showCountryInfo = () => {
    setComponent([...components, props.country])
  }
  return(
    <div>
      {props.country.name}  <button onClick={showCountryInfo}>show</button>
      {components?.map(item => <SpecificCountryInformation key={item} countryData = {item}/> )} 
    </div>
  )
}

const Languages = ({language}) => <li>{language}</li>

const WeatherData =(props) => {
  const URL = props.weatherData.icon ? `http://openweathermap.org/img/wn/${props.weatherData.icon}@2x.png` : ""

  return(
    <div>
      <h2>Weather in {props.weatherData.capital}</h2>
      <p>temperature {props.weatherData.temperature} Celcius</p>
      <img src={`${URL}`} alt='weather icon'/>
      <p>wind {props.weatherData.windSpeed} m/s</p>
    </div>
  )
}
const SpecificCountryInformation = (props) => {
  const[weatherData, setWeatherData] = useState({})

  if(props.countryData === '') {
    return
  }

  const callWeatherAPI = () => {
    const api_key = process.env.REACT_APP_API_KEY
    const capital = props.countryData.capital ? props.countryData.capital : ""
    const countryCode = props.countryData.alpha2Code ? props.countryData.alpha2Code : ""
    const URL = capital ? `https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&units=metric&appid=${api_key}` : ""
    
    if(URL !== ""){
      const promise = axios.get(URL)

      promise
      .then(response => {
        setWeatherData({
          capital: capital,
          temperature: response.data.main.temp,
          icon: response.data.weather[0].icon,
          windSpeed: response.data.wind.speed
        })
      })
    }
  }
    
  if(Object.keys(weatherData).length === 0){
    callWeatherAPI()
  }
  

  return(
    <div>
      <h2>{props.countryData.name}</h2>
      <p>capital {props.countryData.capital}</p>
      <p>area {props.countryData.area}</p>
      <br/>
      <h3>languages:</h3>
      <ul>
        {props.countryData.languages.map(language => <Languages key={language.name} language={language.name}/>)}
      </ul>
      <img src={`${props.countryData.flag}`} alt='flag' width="150px" height="150px"></img>
      {Object.keys(weatherData).length !== 0 ? <WeatherData weatherData = {weatherData}/> : <br/>}

    </div>
  )

}


const Information= (props) => {

  let countriesCount = props.countries.length
  if(countriesCount > 10 && countriesCount < 250){
    return(
      <p>Too many matches, specify another filter: {countriesCount}</p>
    )
  }

  if(countriesCount <= 10 && countriesCount > 1){
    return(
      <div>
        {props.countries
        .map(country => 
        <RenderCountries key={country.name} country = {country}/>
        )}
      </div>
    )
  }
  
  if(countriesCount === 1){
    const countryData = props.countries[0]

    return(
      <SpecificCountryInformation countryData={countryData}/>
    )
  }
}

function App() {

  const[countries, setCountries] = useState([])
  const[search, setSearch]= useState()
  const[searchedCountries, setSearchedCountries] = useState([])

  const getAllCountries = () => {
    axios
    .get('https://restcountries.com/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }
  
  useEffect(getAllCountries, [])

  const searchHandler = (event) => {
    setSearch(search)
    let searchResult = countries.filter(c => c.name.toLowerCase().match(event.target.value.toLowerCase()))
    setSearchedCountries(searchResult)
  }

  return (
    <div className="App">
      find countries <input value={search} onChange={searchHandler}/>

      <Information countries={searchedCountries}></Information>

    </div>
  );
}

export default App;
