'use client'
import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { SlSocialTwitter } from "react-icons/sl";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="footer md:h-auto w-full md:px-[3.8vw] md:py-[.2vw] px-[3vh] py-[.2vh]">
            <div className="blo flex flex-col items-center justify-center gap-2.5 mt-6 mb-6">
                <p className='text-[#6a7077]'>© 2025 Hueborn. All Rights Reserved.</p>
                <a href='/' className='text-[#6a7077]'> Privacy Policy · Terms of Service</a>
            </div>

        </div>
    )
}

export default Footer