'use client'
import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const page = () => {
      const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div className="nav w-full md:px-[3.8vw] md:py-[.2vw] bg-[#ede8e2]
          flex justify-between items-center px-[3vh] py-[.2vh]">
            <h1 className='logo text-[6vh] md:text-[2.8vw] font-semibold'>hb</h1>
            <div className='hidden md:flex nav-menu justify-between items-center gap-[1vw] text-[1.2vw] font-medium'>
                <a href="">HOME</a>
                <a href="">CURATION</a>
                <a href="">ARTIST</a>
                <a href="">ABOUT US</a>
            </div>

            <div className='hidden md:block'>
                <FaRegHeart size="1.8vw"
                    color={isHovered ? '#005f60' : '#6a7077'}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
            </div>

            <div className="hamburger md:hidden">
                <RxHamburgerMenu size="4vh"
                    color={isHovered ? '#005f60' : '#6a7077'}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
            </div>
        </div>
    )
}

export default page