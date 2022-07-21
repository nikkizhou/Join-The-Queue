import React from 'react'
import QueueForm from './QueueForm'
import DetailCard from './DetailCard'

const Store = () => {
  return (
    <div className="store__container">
        <DetailCard/>
        <QueueForm/>
    </div>
  )
}

export default Store
