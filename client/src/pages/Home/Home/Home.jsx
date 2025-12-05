import React from 'react'
import Banner from '../Banner/Banner'
import Services from '../Services/Services'
import ClientLogosSlider from '../ClientLogosSlider/ClientLogosSlider'
import Benefits from '../Benefit/Benifits'
import BeMerchant from '../BeMerchant/BeMerchant'
import KissLoader from '../../Shared/Loader/KissLoader'
import AnimeKissLoader from '../../Shared/Loader/AnimeKissLoader'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <ClientLogosSlider></ClientLogosSlider>
      <Benefits></Benefits>
      <BeMerchant></BeMerchant>
      <KissLoader></KissLoader>
      <AnimeKissLoader></AnimeKissLoader>
    </div>
  )
}

export default Home