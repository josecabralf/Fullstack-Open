import { useState, useEffect } from 'react'
import { getAll, getOne } from './services/countries'
import { Filter } from './components/Filter'
import { CountriesList, Country, None, TooMany } from './components/Countries'

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);

  useEffect(() => {
    getAll().then(countries => setCountries(countries))
  }, []);

  useEffect(() => {
    setCountriesToDisplay(countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase())))
  }, [filter, countries]);

  const onFilterInput = (e) => setFilter(e.target.value);
  
  return (
    <>
      <Filter search={filter} onInput={onFilterInput} text={'find countries'}/>
      {countriesToDisplay.length > 10 && <TooMany />}
      {countriesToDisplay.length === 1 && <Country country={countriesToDisplay[0]} />}
      {countriesToDisplay.length > 1 && countriesToDisplay.length <= 10 && <CountriesList countries={countriesToDisplay} />}
      {countriesToDisplay.length === 0 && <None />}
    </>
  )
}

export default App
