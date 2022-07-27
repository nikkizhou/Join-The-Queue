import {useState} from 'react'
import './Signup.css';
import BusinessList from './Businesslist.js';

const Signup = ({updateBusinessId,businessId,userInfo}) => {
    const [status, setStatus] = useState("Pending");
    const [businessInput,setBusinessInput] = useState({});
    //fetchDataFromGoogle("Fleminggatan 11, 112 26 Stockholm, Sverige")//

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("Sending...");
      const { name, address, waitingTime,description} = e.target.elements;
      let details = {
        name: name.value,
        description: description.value,
        address: address.value,
        waitingTime: waitingTime.value,
        imgLink: imgLink.value
      };
      setBusinessInput(details)
      setStatus("Submit");
  };
    
  return (
    <>
      <form onSubmit={handleSubmit} className="form top-margin">
        <div className="form-wrapper">
          <div className="form-element">
              <label className="form-label" htmlFor="name">Business Name:</label>
              <input className="form-input wide-form-input" type="text" id="name" required />
            </div>
            <div className="form-element">
              <label className="form-label" htmlFor="description">Description :</label>
              <input className="form-input wide-form-input" type="text" id="description" required />
            </div>
            <div className="form-element">
              <label className="form-label" htmlFor="waitingTime">Average waiting time (in minutes):</label>
              <input className="form-input wide-form-input" type="number" id="waitingTime" required />
            </div>
            <div className="form-element">
              <label className="form-label" htmlFor="address">Business Address:</label>
              <input className="form-input wide-form-input" type="text" id="address" required />
            </div>
            <div className="form-element">
              <label className="form-label" htmlFor="imgLink">Image Link :</label>
              <input className="form-input wide-form-input" type="text" id="imgLink" required />
            </div>
            <div className="form-element text-center">
            
              <button className='button' type='submit'>Submit</button>
            </div>
          </div>
      </form>
      {status=='Submit'&& <h3>Results for {businessInput.name} from Google Map:</h3>}
      {businessInput && <BusinessList businessId={businessId}
        updateBusinessId={updateBusinessId}
        userInfo={userInfo}
        businessInput={businessInput}
        status = {status}
      />
      }
     
    </>
  );
};

export default Signup


