// import './Feedback.css'
// // import '../home/customerHome.css'
// import React, { useEffect,useState } from 'react'
// import axios from 'axios'
// // import { Router } from 'react-router'
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useLocation } from 'react-router'

// import ClockLoader from "react-spinners/ClockLoader";


// function Feedback() {
  
//   let [searchParams, setSearchParams] = useSearchParams();
//   const ticketId = searchParams.get('ticketId');
//   const businessId =searchParams.get('businessId');
//   const [tickets, setTickets] = useState(null);
//   const [ticket, setTicket] = useState('ticket default');
//   const [business,setBusiness] = useState(null);
//   const [peopleWaiting,setPeopleWaiting] = useState(0);
//   const navigate = useNavigate();

//   const location = useLocation()
//   const {businessLocation}= location.state
  // const [customerLocation, setCustomerLocation] = useState()

  // const geoLocation = () => {

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       var pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
        
  //       setcustomerLocation(pos)
  //     });
  // }

  // useEffect(() => {
  //   geoLocation()
  // }, [])

 

//   const [loading, isLoading] = useState(true);
//   const [done, setDone] = useState(false);
//   const [cancelled,setCancelled] = useState(localStorage.getItem('cancelled'));

//   const override =  {
//     display: "block",
//     position: "absolute",
//     top: "50%",
//     left: "45%",
//     margin: "0 auto",
//     borderColor: "red",
//   };

//   const getTickets = async ()=>{
//     const tickets = await axios.get(`http://localhost:5001/api/tickets/business/${businessId}`);
//     const currentTicketIndex = tickets.data.findIndex(ticket =>ticket.ticketId == ticketId)
//     const ticketsInFrontOfMe = tickets.data.slice(0,currentTicketIndex)
//     const peopleWaitingD = ticketsInFrontOfMe.filter(t=>t.status=='waiting').length

//     const ticket = tickets.data[currentTicketIndex];
//     if(ticket.status == 'done'){
//       setDone(true)
//       localStorage.setItem('done',true)
//     }

//     setTickets(tickets.data)
//     setPeopleWaiting(peopleWaitingD)
//     setTicket(ticket)
//     isLoading(false)
//   }
//   const getBusiness = async ()=>{
//     const business = await axios.get(`http://localhost:5001/api/business/${businessId}`)
//     setBusiness(business.data);
//   }
  
//   const cancelTicket = async ()=>{
//     await axios.put(`http://localhost:5001/api/tickets/${ticketId}`, {status:'cancelled'})
    
//     localStorage.setItem('cancelled', true)
//     setCancelled(true)
//   }
    
//   useEffect (()=>{
//     const getData = async ()=>{
//       await getBusiness()
//       setInterval(async()=> await getTickets(),1000)
//     }
//     getData();
//   },[])
  
//   const showNext = peopleWaiting>0 ? <h4>Groups in front of you: <h2 className='queue-number'>{peopleWaiting}</h2></h4>: null                  
//   const waitingTime = business?.waitingTime;
//   console.log('business in SignUp!!', business);

// return (
//   <div className='list__container'>

//     <div className=''>
    
//      {loading ?  <ClockLoader color={'#4A90E2'} loading={loading} size={100} cssOverride={override}/>:
//         <div>
//           {done ? <h1 className='finish-msg'> Seems like everything went smoothly! See you next time {ticket.name} </h1>  :
//             <>
//               {ticket.status== 'cancelled' ? <h1  className='finish-msg'> Your ticket has been cancelled by the business. </h1> : 
//                 <>
//                   {!cancelled ?  
//                       <div className="card">
//                         <h4 className="text">Hi { ticket.name }, you're in the queue!</h4>
//                         <h4 className='text large-text'> {business.name}</h4>

//                         <div className='colored-text-box colored-text-box--queue'>

//                           <div className='row top-margin'>
//                                 <h2 className={`colored-text-box small-margin ${ticket.status == 'called' ? "colored-text-box--green small-margin" : "colored-text-box--yellow"}`}> {ticket.status} </h2>
//                           </div>

//                           {ticket.status == 'called' ?  (
//                             <div className='ticket__status'>
//                                 <h4 className="called"><h4> { ticket.name }</h4>Head to the restaurant! </h4>
//                               </div>) : ''}

//                               <div className='list__container'>
//                                 <div className='queue-info-container'>{showNext}
//                               </div>
//                               <p className='text'>Your estimated waiting time is <span className='text'>{peopleWaiting*waitingTime}</span>min</p>
//                             </div>

//                         </div>

                
//                         <div className='ticket__number-container'>
//                                 <h4 className="text text-box">Your ticket number is:</h4>
//                                 <h1 className='text large-text'> {ticketId}</h1>
//                         </div>
//                         <div className='ticket__queue-info'>
//                         <button className='button button--cancel' onClick={cancelTicket}>Leave the queue</button>
//                         </div>
//                       </div>
//                       : 
//                       <div>
//                         <h1>Your ticket has been cancelled</h1>
//                         <button className="button" onClick={() =>{navigate(`/customer/home`)}}>Queue again?</button>
//                       </div>}
//                     </>
//                     }
                  
//                         </>}
//                       </div>}
//                       {!done &&!loading&& <iframe
//                       width="350"
//                       height="200"
//                       frameBorder="0" style={{border:0}}
//                       referrerpolicy="no-referrer-when-downgrade"
//                       src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCWJ0GsY0BynFt81-H82ok6RqIsZilr768&
//                       origin=Oslo+Norway&${customerLocation}=${businessLocation}`}>
//                     </iframe>}
                    
//                     </div>
                  
//                   </div>


//   )
    
// }}
//   export default Feedback


import './Feedback.css'
// import '../home/customerHome.css'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
// import { Router } from 'react-router'
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router'
import ClockLoader from "react-spinners/ClockLoader";


function Feedback() {
  
  let [searchParams, setSearchParams] = useSearchParams();
  const ticketId = searchParams.get('ticketId');
  const businessId =searchParams.get('businessId');
  const [tickets, setTickets] = useState(null);
  const [ticket, setTicket] = useState('ticket default');
  const [business,setBusiness] = useState(null);
  const [peopleWaiting,setPeopleWaiting] = useState(0);
  const navigate = useNavigate();

  const location = useLocation()
  const {businessLocation}= location.state
  // console.log(businessLocation,'businessLocation');
  const [customerLocation, setCustomerLocation] = useState()
console.log(customerLocation,'cuslocation');



  const [loading, isLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [cancelled,setCancelled] = useState(localStorage.getItem('cancelled'));

  const geoLocation = () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        setCustomerLocation(pos,error,options)
      });
  }}

  useEffect(() => {
      geoLocation()
    console.log(customerLocation,'dupa');
    console.log(businessLocation,'gowno');
  }, [])


  const override =  {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "45%",
    margin: "0 auto",
    borderColor: "red",
  };

  const getTickets = async ()=>{
    const tickets = await axios.get(`http://localhost:5001/api/tickets/business/${businessId}`);
    const currentTicketIndex = tickets.data.findIndex(ticket =>ticket.ticketId == ticketId)
    const ticketsInFrontOfMe = tickets.data.slice(0,currentTicketIndex)
    const peopleWaitingD = ticketsInFrontOfMe.filter(t=>t.status=='waiting').length

    const ticket = tickets.data[currentTicketIndex];
    if(ticket.status == 'done'){
      setDone(true)
      localStorage.setItem('done',true)
    }

    setTickets(tickets.data)
    setPeopleWaiting(peopleWaitingD)
    setTicket(ticket)
    isLoading(false)
  }
  const getBusiness = async ()=>{
    const business = await axios.get(`http://localhost:5001/api/business/${businessId}`)
    setBusiness(business.data);
  }
  
  const cancelTicket = async ()=>{
    await axios.put(`http://localhost:5001/api/tickets/${ticketId}`, {status:'cancelled'})
    
    localStorage.setItem('cancelled', true)
    setCancelled(true)
  }
    
  useEffect (()=>{
    const getData = async ()=>{
      await getBusiness()
      setInterval(async()=> await getTickets(),1000)
    }
    getData();
  },[])
  
  const showNext = peopleWaiting>0 ? <h4>People In Front<h2 className='queue-number'>{peopleWaiting}</h2></h4>: null                  
  const waitingTime = business?.waitingTime;

return (
  <div className='list__container'>

  <div className='card column'>
    
            {loading ?  <ClockLoader color={'#4A90E2'} loading={loading} size={100} cssOverride={override}/>:
            <div>
              
              {done ? <h1 className='finish-msg'> Seems like everything went smoothly! See you next time {ticket.name} </h1>  :
              <>
    {ticket.status== 'cancelled' ? <h1  className='finish-msg'> Restaurant decided to cancel your ticket. Most likely due to no show</h1> : 
    <>

  {!cancelled ?  
      <div className="">
        {ticketId ?  (<div className='ticket__number-container'>
            <h4 className="text text-box">Hi <h4 className="text"> { ticket.name }</h4>your ticket number is:</h4>
            <h1 className='text large-text'> {ticketId}</h1>
        </div>) : null}

        <div className='row top-margin'>
          <h2 className={`colored-text-box small-margin ${ticket.status == 'called' ? "colored-text-box--green small-margin" : "colored-text-box--yellow"}`}> {ticket.status} </h2>
        </div>

        {ticket.status == 'called' ?  (<div className='ticket__status'>
            <h4 className="called"><h4> { ticket.name }</h4>Head to the restaurant! </h4>
        </div>) : ''}

        <div className='list__container top-margin'>
          
            {business ?  (
            <div className='ticket__name-container'>
                <h4>You're in the queue for</h4><h4 className='text large-text'> {business.name}</h4>
            </div>) 
          : <h1>Business does not exist</h1>}

        <div className='queue-info-container top-margin'>{showNext}</div>
        <p>Estimated Waiting Time: <span className='waitingTime'>{peopleWaiting*waitingTime}</span>min</p>
        </div>
        <div className='ticket__queue-info'>
        <button className='button button--cancel' onClick={cancelTicket}>Leave the queue</button>
        </div>
      </div>
      : 
      <div>
        <h1>Your ticket has been cancelled</h1>
        <button className="button" onClick={() =>{navigate(`/customer/home`)}}>Queue again?</button>
      </div>}
    </>
    }
  
        </>}
      </div>}
      {customerLocation &&<iframe
        width="350"
        height="200"
        frameBorder="0" style={{border:0}}
        referrerpolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCWJ0GsY0BynFt81-H82ok6RqIsZilr768&origin=Oslo&destination=${businessLocation.lat},${businessLocation.long}`}>
      </iframe>}
    </div>
  

  </div>


  )
    
}
  export default Feedback