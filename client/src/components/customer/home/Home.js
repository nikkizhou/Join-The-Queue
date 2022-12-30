import React,{useState} from 'react'
import RestaurantList from './RestaurantList'

 
function Home({ cusLocation }) {
  const [search, setSearch] = useState("")
  
  return (
    <>
      <form className="form">
        <input
          className="form-input"
          type="text"
          value={search}
          placeholder="Search for a restaurant..."
          onChange={event => setSearch(event.target.value)}
        />
      </form>
      {<RestaurantList search={search} cusLocation={cusLocation} />}
    </>
  )
}

export default Home
