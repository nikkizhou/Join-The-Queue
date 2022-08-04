import axios from 'axios';
import { useDispatch } from 'react-redux'
import { updateBusinessId } from '../../../slices/businessSlice'
import { useAuth0 } from '@auth0/auth0-react';

function BusinessItem({ googleBizData, businessInput }) {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  //console.log('user in businessItem: ',user);

  const getBizIdFromDb = async () => {
    const {waitingTime, imgLink,description} = businessInput
    const businessDB = await axios.post('/api/business', { ...googleBizData, waitingTime, imgLink,description })
      .catch(error => console.log(error))
    return businessDB.data.id;
  };

  const fixBizId = async () => {
    const createdBusinessId = await getBizIdFromDb();
    console.log('createdBusinessId', createdBusinessId);
    dispatch(updateBusinessId(createdBusinessId));
    await axios.put(`/api/user/${user.email}`, { businessId: createdBusinessId })
    alert('Your business is now registered in our system! ')
  }

  if (googleBizData && !googleBizData.name.includes('Undefined'))
    return (
    <div className='list__container'>
      <div className='card'>
        <img className='restaurant-card__image' src={businessInput.imgLink} alt= {`photo for ${googleBizData.name}`} />
        <div className='restaurant-card__footer'>
          <div className="column">
            <h3 className='highlight'>{googleBizData.name}</h3>
            <h4 className='text'>Address: {googleBizData.formatted_address}</h4>
          </div>
          <p className='text grey-text'>Rating: {googleBizData.rating}</p>
        </div>
        <div className='restaurant-card__buttons'>
          <button className="button" onClick={fixBizId}>It's my business</button>
          <button className='button'>Not my business</button>
        </div>
      </div>
    </div>
)}

export default BusinessItem
