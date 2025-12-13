'use client'
import React from 'react'
import Link from "next/link";
import Image from 'next/image';

const page = () => {


  return (
    <div>
      <div className='conatiner md:relative h-auto md:h-screen w-full
       md:px-0 md:py-0 px-[1.3vh] py-[.2vh] mb-10 md:mb-0'>
        <Image width={0} height={0} sizes='100vh'
          className='hero-img w-full md:h-full h-[46vh] md:z-[-2] 
          object-cover object-[right_36%] rounded-[33px] md:rounded-none'
          src="https://res.cloudinary.com/dwx3h8yid/image/upload/v1764920771/uiestdwwcsleuxphd0ma.png" alt="hero section image" />

        <div className="over md:absolute md:top-0 md:left-0 w-full 
          md:h-full z-10 md:bg-[#11111154] 
          md:px-[3.8vw] md:py-[.2vw] px-0 py-0">

          <div className="hero-content w-full h-auto md:h-full flex flex-col 
          justify-center items-center mt-4 md:mt-0
          md:gap-10 gap-4">

            <h1 className='hero-text font-bold md:text-[#ede8e2] text-[#0f0f10]'
            >HUEBORN
            </h1>

            <p className='hero-para md:w-[60%] text-[#6a7077] md:text-[#ede8e2ca]
            md:text-center text-balance'>
              Clothing is more than fabric it's a reflection of who you are. Every stitch, every shade, and every design tells a story of confidence, individuality, and timeless elegance.
            </p>

            <Link href='#categories'
              className='hero-btn text-center md:w-fit font-medium'
            >Discover Your Hue</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page