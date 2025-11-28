import React from 'react'
import Banner from '../Banner/Banner'
import Services from '../Services/Services'
import ClientLogosSlider from '../ClientLogosSlider/ClientLogosSlider'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <ClientLogosSlider></ClientLogosSlider>
    </div>
  )
}

export default Home