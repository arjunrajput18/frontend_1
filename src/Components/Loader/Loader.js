import React from 'react'
import loader from './loader.gif'
import './Loader.css'

export const Loader = () => {
  return (
    <div className='loader-box'>
      <img src={loader} alt="loading" className='loader' />
    </div>
  )
}