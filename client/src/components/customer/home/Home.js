import React,{useEffect,useState} from 'react'
import RestaurantList from './RestaurantList'
import axios from 'axios'
import SearchForm from './SearchForm'
 

function Home() {
  const [restaurantList, setRestaurantList] = useState(null)

  const fetchData = async () => {
    try {
      const business = await axios.get(`http://localhost:5001/api/business`)
      setRestaurantList(business.data)
  } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
        { restaurantList ?  <RestaurantList restaurantList={restaurantList} />  : null}
    </>
  )
}

export default Home