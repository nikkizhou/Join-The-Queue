import {useState} from 'react'
import './Signup.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Signup = ({updateBusinessId}) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("Submit");

    // const formattedAddress = address.replace(' ','%20');
    // fetchDataFromGoogle({name:'eat east', address:"Fleminggatan 11, 112 26 Stockholm, Sverige"})

    const createBusinessInDb = async (details)=>{
      //fetch data from googlemap based on name and address
      //update local host to mongo DB
      
      //const dataFromGoogle = await fetchDataFromGoogle(details);
      return await axios.post('http://localhost:5001/api/business', dataFromGoogle)
      .catch(error=> console.log(error));
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("Sending...");
      const { name, address} = e.target.elements;
      let details = {
        name: name.value,
        address: address.value,
      };

      const business = await createBusinessInDb(details);
      console.log(business.data,'business handleSubmit!!!');

      const businessId = business.data.id;
      localStorage.setItem('businessId',`${businessId}`)
      updateBusinessId(businessId)

      setStatus("Submit");
      navigate({ pathname: `/business/ticketList/${business.data.id}`})
      //updateRegistered(true);
      
    };

    return (
      <>
        <h3>You are logged in!</h3>
        <h4>Register your business in our Queue System:</h4>
        <form onSubmit={handleSubmit} className="signup">
            <div className="signup__title">Add Your Business</div>
            <label className="signup__input-label" htmlFor="name">Business Name:</label>
            <input className="signup__input-input" type="text" id="name" required />
          
            <label className="signup__input-label" htmlFor="type">Type of business:</label>
            <input className="signup__input-input" type="text" id="type" required />
          
            <label className="signup__input-label" htmlFor="address">Business Address:</label>
            <input className="signup__input-input" type="text" id="address" required />
          
            <label className="signup__input-label" htmlFor="email">Email:</label>
            <input className="signup__input-input" type="email" id="email" required />
          
            <label className="signup__input-label" htmlFor="message">Message:</label>
            <textarea className="signup__input-input" id="message" required />
            <button className="signup__addButton" type="submit">{status}</button>
        </form>
      </>
    );
  };

export default Signup