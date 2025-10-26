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
                    <div className="email-form mt-4 flex items-center h-14">
                        <input
                            className='px-3 h-full flex-1 bg-[#1e1e1e] rounded-l-sm text-[#949494] outline-none'
                            type="text"
                            placeholder='Your Email' />

                        <button
                            className='px-4 h-full bg-[#005f60] rounded-r-sm text-[#949494]'
                        >
                            <IoIosArrowRoundForward style={{fontSize: "clamp(2rem, 3rem, 3rem)"}} />
                        </button>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <h6>Follow Us</h6>
                    <div className='text-[#949494] flex items-center justify-start md:justify-between gap-3'>
                        <Link href='https://www.instagram.com'>
                            <FaInstagram style={{fontSize: "clamp(1.2rem, 2rem, 3rem)"}} />
                        </Link>
                        <Link href='https://www.instagram.com'>
                            <FiFacebook style={{fontSize: "clamp(1.2rem, 2rem, 3rem)"}} />
                        </Link>
                        <Link href='https://www.instagram.com'>
                            <SlSocialTwitter style={{fontSize: "clamp(1.2rem, 2rem, 3rem)"}} />
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
    )
}

export default Footer