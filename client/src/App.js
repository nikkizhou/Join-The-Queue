import './App.css';
import Customer from './components/customer/Customer';
import Business from './components/business/Business';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  // const [restaurantList, setRestaurantList] = useState(null)
  // const [query, setQuery] = useState("");


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const business = await axios.get(`http://localhost:5001/business/${query}`)
  //       setRestaurantList(business.data)
  //   } catch (e) {
  //       console.error(e)
  //     }
  //   }
  //   fetchData()
  // }),[query]
  
  return (
    <>
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <Routes>
          <Route path="/customer/*" element={<Customer />}/>
          <Route path="/business/*" element={<Business />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;

//{restaurantList ? <RestaurantList list={restaurantList} /> : null}

// routes
//  /customer  element = {Customer}
//  /business  element = {Business}
