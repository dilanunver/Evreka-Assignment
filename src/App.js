import React, { useState, useEffect } from 'react';
import Loading from './Loading'
import Search from './Search'
import { FaMapMarkerAlt } from 'react-icons/fa'


const App = () => {

  const url = 'https://api.openbrewerydb.org/breweries';
  const [breweries, setBreweries] = useState([])
  const [loading, setLoading] = useState(true);

  const fetchBreweries = async () => {
    const response = await fetch(url);
    const newBreweries = await response.json()
    setBreweries(newBreweries)
    setLoading(false)
  }

  useEffect(() => {
    fetchBreweries()
  }, [])

  const onSearch = async (value) => {
    setLoading(true)
    const url = `https://api.openbrewerydb.org/breweries/search?query=${value}`;
    const response = await fetch(url);
    const newBreweries = await response.json()
    setBreweries(newBreweries)
    setLoading(false)

  }

  const checkFalsy = (value) => {
    if (value) return value;
    return 'not specified'
  }

  if (loading) {
    return <Loading></Loading>
  }

  if (breweries.length > 0) {
    return (
      <main>
        <div className='title'>
          <h2>breweries</h2>
          <div className='underline'></div>
          <Search onSearch={onSearch}></Search>
        </div>
        <section className='brewery section'>
          {breweries.map(({
            id, latitude, longitude, name, website_url, city, country, phone, street
          }) => {
            return (
              <div key={id} className='brewery-item'>
                <div className='brewery-piece'>
                  <h2 className='brewery-title'>{checkFalsy(name)} </h2>
                  {website_url && <a href={`${website_url}`} className='website' >visit website</a>}
                  <h4>Address: {checkFalsy(street)}, {checkFalsy(city)}, {checkFalsy(country)} </h4>
                  <h4>Phone: {checkFalsy(phone)} </h4>
                  {latitude && longitude && <p> see in the map <a href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}><FaMapMarkerAlt className='icon'></FaMapMarkerAlt></a></p>}
                </div>
              </div>
            )
          })}
        </section>
      </main >
    )
  }

  return (
    <div className='title'>
      <h2>breweries</h2>
      <div className='underline'></div>
      <Search onClickProp={onSearch}></Search>
      <h2 className='match-title'>
        no breweries matched your search criteria
    </h2>
    </div>
  )
}
export default App