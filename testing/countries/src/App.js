import { useState, useEffect } from 'react'
import getCountries from './services/countries'
import SearchForm from './components/SearchForm'
import Countries from './components/Countries'
import './index.css'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {getCountries().then(countries => setCountries(countries))}, [])

  useEffect(() => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    setCountriesToShow(filteredCountries)
  }, [countries, filter])

  return (
    <div className="page">
      <SearchForm filter={filter} setFilter={setFilter} />
      <Countries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow} />
    </div>
  )
}

export default App;
