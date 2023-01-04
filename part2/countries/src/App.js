import {useEffect, useState} from 'react'
import  axios from 'axios'

const RenderCountries = (props) => <p>{props.countryNames}</p>

const Languages = ({language}) => <li>{language}</li>

const Message= (props) => {
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
        .map(c => 
        <RenderCountries key={c.name} countryNames = {c.name}/>
        )}
      </div>
    )
  }
  
  if(countriesCount === 1){
    const countryData = props.countries[0]
    return(
      <div>
        <h2>{countryData.name}</h2>
        <p>capital {countryData.capital}</p>
        <p>area {countryData.area}</p>

        <br/>
        <h3>languages:</h3>
        <ul>
          {countryData.languages.map(language => <Languages key={language.name} language={language.name}/>)}
        </ul>
        <img src={`${countryData.flag}`} alt='flag' width="150px" height="150px"></img>
      </div>
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

      <Message countries={searchedCountries}></Message>

    </div>
  );
}

export default App;
