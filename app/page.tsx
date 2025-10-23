'use client'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { SlSocialTwitter } from "react-icons/sl";
import Link from "next/link";

const page = () => {


  return (
    <div>
      {/* nav section */}
      <Navbar />
      {/* hero section */}
      <div className='md:relative h-auto md:h-screen w-full md:px-0 md:py-0 px-[1.3vh] py-[.2vh] bg-[#ede8e2] mb-10 md:mb-0'>
        <img
          className='w-full md:h-full h-[46vh] md:z-[-2] object-cover object-right-top md:object-top
          rounded-[33px] md:rounded-none'
          src="/hero.jpg" alt="" />

        <div className="over md:absolute md:top-0 md:left-0 w-full 
          md:h-full z-50 md:bg-[#11111170] 
          md:px-[3.8vw] md:py-[.2vw] px-0 py-0">

          <div className="hero-content w-full md:w-[60%] h-auto md:h-full flex flex-col  md:justify-center items-stretch md:items-start mt-4 md:mt-0">

            <h6 className='hero-text text-[5vh] font-bold md:text-[8vw] text-[#0f0f10] md:text-[#ede8e2] leading-10 md:leading-[7.4vw]'
            >Dress for the Life You Desire.
            </h6>

            <button
              className='hero-btn md:w-fit mt-[4vh] md:mt-[3.6vw] px-[3vh] py-[1vh] text-[2.6vh] md:px-[1.8vw] md:py-[.6vw] md:text-[1.4vw] font-semibold'
            >Explore Collections</button>
          </div>
        </div>
      </div>

      {/* footer section */}
      <div className="footer md:h-auto w-full md:px-[3.8vw] md:py-[.2vw] px-[3vh] py-[.2vh]">
        <div className="abv flex flex-col md:flex-row gap-8 md:justify-evenly mt-10 md:mt-4">
          <div className='flex flex-col md:w-[16vw] w-auto'>
            <h6 className='footer-logo'>HueBorn</h6>
            <p className='text-[#949494] font-semibold'>The art of unhurried living, expressed through curated style.</p>
          </div>

          <div className='flex flex-col'>
            <h6>shop</h6>
            <a className='text-[#949494] font-semibold' href="/">Linen Shirt</a>
            <a className='text-[#949494] font-semibold' href="/">Polo Shirt</a>
            <a className='text-[#949494] font-semibold' href="/">Trousers</a>
            <a className='text-[#949494] font-semibold' href="/">Shoes</a>
          </div>

          <div className='flex flex-col'>
            <h6>Stay Connected</h6>
            <p className='text-[#949494] font-semibold'>Join our journal for insights on style and curation.</p>
            <div className="email-form mt-4 flex items-center h-[56px]">
              <input
                className='px-3 h-full flex-1 bg-[#1e1e1e] rounded-l-sm text-[#949494] outline-none'
                type="text"
                placeholder='Your Email' />

              <button
                className='px-4 h-full bg-[#005f60] rounded-r-sm text-[#949494]'
              >
                <IoIosArrowRoundForward size='6vh' />
              </button>
            </div>
          </div>

          <div className='flex flex-col'>
            <h6>Follow Us</h6>
            <div className='text-[#949494] flex items-center justify-start md:justify-between gap-3'>
              <Link href='https://www.instagram.com'>
                <FaInstagram size='6vh' />
              </Link>
              <Link href='https://www.instagram.com'>
                <FiFacebook size='6vh' />
              </Link>
              <Link href='https://www.instagram.com'>
                <SlSocialTwitter size='6vh' />
              </Link>
            </div>
          </div>
        </div>

        <div className="br h-px bg-zinc-800 mt-8 mb-8"></div>
        <div className="blo flex flex-col items-center justify-center gap-2.5 mb-10">
          <p className='text-[#6a7077]'>© 2025 Hueborn. All Rights Reserved.</p>
          <a href='/' className='text-[#6a7077]'> Privacy Policy · Terms of Service</a>
        </div>

      </div>
    </div>
  )
}

export default page