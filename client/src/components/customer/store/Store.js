import React from 'react'
import QueueForm from './QueueForm'
import DetailCard from './DetailCard'
import './Store.css'


const Store = () => {
  return (
    <div className="store__container">
        <DetailCard/>
        <QueueForm/>
    </div>
  )
}

export default Store
