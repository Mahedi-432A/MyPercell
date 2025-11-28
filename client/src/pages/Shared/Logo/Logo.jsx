import React from 'react'
import logo from '../../../assets/logo.png'

const Logo = () => {
  return (
    <div className='flex items-end'>
        <img className='mb-2' src={logo} alt="Logo Image" />
        <p className='text-3xl -ml-3 font-extrabold'>MyPercell</p>
    </div>
  )
}

export default Logo