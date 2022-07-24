import {useState, useEffect} from 'react'
import './customerHome.css'

// eslint-disable-next-line no-unused-expressions

const SearchForm = ({searchQuery,restaurantList})=> {
  const [search, setSearch] = useState("")

  // res.name.contains(query)
  const searcher = ()=>{
    searchQuery(search)
  }
 searcher()

  
  return (
    <>
    <form  className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          placeholder = "Meatballs..."
          onChange={event => setSearch(event.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchForm;
