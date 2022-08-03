import {useState} from 'react'
import './Signup.css';
import BusinessList from './Businesslist.js';

const Signup = () => {
  const [businessInput,setBusinessInput] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, address, waitingTime,description,imgLink} = e.target.elements;
    let details = {
      name: name.value,
      description: description.value,
      address: address.value,
      waitingTime: waitingTime.value,
      imgLink: imgLink.value
    };
    setBusinessInput(details)
  };

  return (
    <>
      <h2>Register My Business</h2>
      <form onSubmit={handleSubmit} className="form top-margin">
        <ul className="form-wrapper">
          <FormElement text='Business Name:' htmlForVal='name' />
          <FormElement text='Description' htmlForVal='description' />
          <FormElement text='Average waiting minutes each customer:' htmlForVal='waitingTime' type='number' />
          <FormElement text='Business Address:' htmlForVal='address' />
          <FormElement text='Image Link:' htmlForVal='imgLink' />
          <li className="form-element text-center">
            <button className='button' type='submit'>Submit</button>
          </li>
        </ul>
      </form>
      {businessInput && <BusinessList businessInput={businessInput}/>}
    </>
  );
};

const FormElement = ({ text, htmlForVal,type }) => {
  return (
    <li className="form-element">
      <label className="form-label" htmlFor={htmlForVal}>{text}</label>
      <input className="form-input wide-form-input" type={type?type:"text"} id={htmlForVal} required />
    </li>
  )
}

export default Signup
