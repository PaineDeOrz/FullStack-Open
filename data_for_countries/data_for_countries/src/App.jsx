import axios from 'axios'
import {useState, useEffect} from 'react'

const Countries = ({ countriesToShow, handleShowCountry }) => {
  return (
    countriesToShow === 'Too many matches, specify another filter'
      ? <div>{countriesToShow}</div>
      : countriesToShow.length !== 1
        ? countriesToShow.map(country => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>show</button>
            </div>
          ))
        : <Country country={countriesToShow[0]} />
  );
};

const Country = ({country}) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    )
  }

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const handleShowCountry = (country) => {
    setFilteredCountries([country])
  }

  const countriesToShow = (filteredCountries.length > 0 && filteredCountries.length <= 10)
    ? filteredCountries
    : 'Too many matches, specify another filter'

  return(
    <div>
      find countries <input value={filter} onChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow} handleShowCountry={handleShowCountry} />
    </div>
  )

}

export default App