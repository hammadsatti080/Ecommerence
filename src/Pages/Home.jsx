import React , { useEffect } from 'react'
import Header from '../Component/Homescreen/Header'
import About from '../Component/Homescreen/About'
import Item from '../Component/Homescreen/Item'
import Review from '../Component/Homescreen/Review'
import FAQ from '../Component/Homescreen/FAQ'

export default function Home() {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);
  return (
    <div>
      <Header />
      <About />
      <Item />
      <Review />
      <FAQ />
    </div>
  )
}
