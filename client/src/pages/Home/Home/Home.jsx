import React from 'react'
import Banner from '../Banner/Banner'
import Services from '../Services/Services'
import ClientLogosSlider from '../ClientLogosSlider/ClientLogosSlider'
import Benefits from '../Benefit/Benifits'
import BeMerchant from '../BeMerchant/BeMerchant'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <ClientLogosSlider></ClientLogosSlider>
      <Benefits></Benefits>
      <BeMerchant></BeMerchant>
    </div>
  )
}

export default Home