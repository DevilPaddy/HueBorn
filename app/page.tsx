'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import Link from "next/link";
import Footer from '../components/Footer';

const page = () => {


  return (
    <div>
      {/* nav section */}
      <div className='fixed w-full top-0 left-0 z-20'>
        <Navbar />
      </div>
      {/* hero section */}
      <div className='md:relative h-auto md:h-screen w-full md:px-0 md:py-0 px-[1.3vh] py-[.2vh] mb-10 md:mb-0 mt-20 md:mt-[4.6vw]'>
        <img
          className='w-full md:h-full h-[46vh] md:z-[-2] object-cover object-right-top md:object-top
          rounded-[33px] md:rounded-none'
          src="/hero.jpg" alt="" />

        <div className="over md:absolute md:top-0 md:left-0 w-full 
          md:h-full z-10 md:bg-[#11111170] 
          md:px-[3.8vw] md:py-[.2vw] px-0 py-0">

          <div className="hero-content w-full md:w-[60%] h-auto md:h-full flex flex-col  md:justify-center items-stretch md:items-start mt-4 md:mt-0">

            <h6 className='hero-text text-[5vh] font-bold md:text-[8vw] text-[#0f0f10] md:text-[#ede8e2] leading-10 md:leading-[7.4vw]'
            >Dress for the Life You Desire.
            </h6>

            <Link href='/categories'
              className='hero-btn text-center md:w-fit mt-[4vh] md:mt-[3.6vw] px-[3vh] py-[1vh] text-[2.6vh] md:px-[1.8vw] md:py-[.6vw] md:text-[1.4vw] font-semibold'
            >Explore Collections</Link>
          </div>
        </div>
      </div>

      {/* footer section */}
      <Footer />
    </div>
  )
}

export default page