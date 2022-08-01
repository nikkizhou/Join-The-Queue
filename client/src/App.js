import Customer from './components/customer/Customer';
import Business from './components/business/Business';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";


function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/customer/*" element={<Customer />}/>
          <Route path="/business/*" element={<Business />} />
          <Route path="*" element={<Navigate replace to='/customer/home' />}/>
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
