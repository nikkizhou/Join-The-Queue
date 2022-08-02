import axios from 'axios';
import { useDispatch } from 'react-redux'
import { updateBusinessId } from '../../../slices/businessSlice'

function BusinessItem({ googleBizData, userInfo, businessInput }) {
  const dispatch = useDispatch();
  //const {businessId } = useSelector((store) => store.businessReducer);

  const addToDB = async () => {
    const {waitingTime, imgLink} = businessInput
    const businessDB = await axios.post('/api/business', { ...googleBizData, waitingTime, imgLink })
      .catch(error => console.log(error))
    const createdBusinessId = businessDB.data.id;

    dispatch(updateBusinessId(createdBusinessId));
    await axios.put(`/api/user/${userInfo.email}`,{businessId: createdBusinessId})
    alert('Your business is now registered in our system! ')
  };

  if (googleBizData && !googleBizData.name.includes('Undefined')) return (
    
    <div className='list__container'>
      <div className='card'>
      <img className='restaurant-card__image' src={businessInput.imgLink} alt= {`photo for ${googleBizData.name}`} />
      <div className='restaurant-card__footer'>
        <div className="column">
        <p className='text'>Name: {googleBizData.name}</p>
        <p className='text'>Address: {googleBizData.formatted_address}</p>
        </div>
        <p className='text grey-text'>Rating: {googleBizData.rating}</p>
      </div>
      <div className='restaurant-card__buttons'>
        <button className="button" onClick={addToDB}>This is my business</button>
        <button className='button'>Not my business</button>
      </div>
      </div>
    </div>
)}

export default BusinessItem
