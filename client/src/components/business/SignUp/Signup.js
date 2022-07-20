import {useState} from 'react'
import './Signup.css';

const Signup = () => {
    const [status, setStatus] = useState("Submit");
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("Sending...");
      const { name, type, address, email, message } = e.target.elements;
      let details = {
        name: name.value,
        type: type.value,
        address: address.value,
        email: email.value,
        message: message.value,
      };
      //update local host to mongo DB
      let response = await fetch("http://localhost:5001/api/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });
      setStatus("Submit");
      let result = await response.json();
      alert(result.status);
    };

    return (
      <form onSubmit={handleSubmit} className="signup">
          <div className="signup__title">Register New Business</div>
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
    );
  };

export default Signup