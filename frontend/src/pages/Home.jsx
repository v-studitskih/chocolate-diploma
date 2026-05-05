import React from 'react'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import TopIngredients from '../components/TopIngredients'
import Combinations from '../components/Combinations'

export default function Home() {
  return (
    <div> 
      <Hero />
      <Combinations/>
      <TopIngredients/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}
