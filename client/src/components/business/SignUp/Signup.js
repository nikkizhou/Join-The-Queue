import {useState} from 'react'
import './Signup.css';
import {useNavigate,Route,Routes} from 'react-router-dom';
import axios from 'axios';
import BusinessList from './Businesslist.js';
import Business from './BusinessItem';

const Signup = ({updateBusinessId,businessId,userInfo}) => {
    const [status, setStatus] = useState("Pending");
    const [businessInput,setBusinessInput] = useState({});
    //fetchDataFromGoogle("Fleminggatan 11, 112 26 Stockholm, Sverige")//

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("Sending...");
      const { name, address, waitingTime} = e.target.elements;
      let details = {
        name: name.value,
        address: address.value,
        waitingTime: waitingTime.value
      };
      setBusinessInput(details)
      setStatus("Submit");
      console.log(businessInput,'businessInput');
  };
    
  
    return (
      <>
        <h4>Register your business in our Queue System:</h4>
        <form onSubmit={handleSubmit} className="signup">
            <div className="signup__title">Add Your Business</div>
            <label className="signup__input-label" htmlFor="name">Business Name:</label>
            <input className="signup__input-input" type="text" id="name" required />
          
            <label className="signup__input-label" htmlFor="waitingTime">Estimated Waiting Minutes Each Ticket:</label>
            <input className="signup__input-input" type="text" id="waitingTime" required />
          
            <label className="signup__input-label" htmlFor="address">Business Address:</label>
            <input className="signup__input-input" type="text" id="address" required />

            <button type='submit'>Submit</button>
          
        </form>
        {businessInput && <BusinessList businessId={businessId} updateBusinessId={updateBusinessId} userInfo={userInfo} businessInput={businessInput} test='testing!!'/>}
      </>
    );
  };

export default Signup