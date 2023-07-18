import React from 'react'
import PopularClassesSection from '../../components/PopularClasses/PopularClassesSection'
import PopularInstructorsSection from '../../components/PopularInstructorsSection/PopularInstructorsSection'
import Slider from './Slider'
import BenifitSection from './BenifitSection/BenifitSection'

const Home = () => {
  return (
    <>
        <Slider></Slider>
        <PopularClassesSection></PopularClassesSection>
        <PopularInstructorsSection></PopularInstructorsSection>
        <BenifitSection></BenifitSection>

    </>
  )
}

export default Home