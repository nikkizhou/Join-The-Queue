import {useState, useEffect} from 'react'
import RestaurantList from './RestaurantList';
import './customerHome.css'

// eslint-disable-next-line no-unused-expressions

const SearchForm = ()=> {
  const [search, setSearch] = useState(null)
  const [query, setQuery] = useState(null)
  const restaurantList = []

  const updateSearch = (e) => {
    setSearch(e.target.value);
    };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  
  
  return (
    <>
    <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    <div >
    {restaurantList ? <RestaurantList list={restaurantList} /> : null}
    </div>
    </>
  );
}

export default SearchForm;
