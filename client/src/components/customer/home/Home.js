import React,{useEffect,useState} from 'react'
import RestaurantList from './RestaurantList'
import axios from 'axios'
 
function Home() {
  const [restaurantList, setRestaurantList] = useState([])
  // const [matchedRestaurantList, setMatchedRestaurantList] = useState(null)
  const [query,setQuery] = useState(null)
  

  const fetchData = async () => {
    try {
      const business = await axios.get(`/api/business`)
      setRestaurantList(business.data)
  } catch (e) {
      console.error(e)
    }
  }

  // const searchQuery = (search)=>{
  //   setQuery(search)
  // }

  useEffect(() => {
    fetchData();
  }, []);

  // const resToRender = matchedRestaurantList ? matchedRestaurantList : restaurantList
  // restaurantList={resToRender} 

  return (
    <>
      {/* <SearchForm searchQuery={searchQuery} />  */}
      { restaurantList ? <RestaurantList query={query} restaurantList={restaurantList} /> : '' }
    </>
  )
}

export default Home