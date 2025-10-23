'use client'
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

import Link from 'next/link'

const page = () => {
    return (
        <div>
            <div className='fixed w-full top-0 left-0'>
                <Navbar />
            </div>

            <div className="category-section bg-[#ede8e2] h-auto w-full md:px-[3.8vw] md:py-[1.4vw] px-[3vh] py-[.2vh] mt-20">
                <div className="flex flex-col items-center justify-center">
                    <Link
                        className='sub-link flex items-center'
                        href='/'
                    ><IoIosArrowRoundBack />Back to Home Page
                    </Link>
                    <h4 className='title-txt md:text-[3vw] font-bold'>Shop by Category</h4>
                    <p className='sub-txt'>Timeless Style Awaits</p>
                </div>

                {/* categories card */}
                <div className="card-container  w-full h-auto">
                    <Link
                        href='/'
                        className="card bg-[#868686]">
                        <div className='flex h-[87%] items-center justify-center'>
                            <h2 className='card-txt text-[#38393A]'>Linen Shirt</h2>
                        </div>
                        <div className='p-4'>
                            <p
                                className='card-link'
                            >Explore Line Shirt</p>
                        </div>
                    </Link>

                    <Link href='/' className="card bg-[#00393A]">
                        <div className='flex h-[87%] items-center justify-center'>
                            <h2 className='card-txt text-[#949494]'>Polo Shirt</h2>
                        </div>
                        <div className='p-4'>
                            <p
                                className='card-link'
                            >Explore Polo Shirt</p>
                        </div>
                    </Link>

                    <Link href='/' className="card bg-[#6B6B6B]">
                        <div className='flex h-[87%] items-center justify-center'>
                            <h2 className='card-txt text-[#38393A]'>Trousers</h2>
                        </div>
                        <div className='p-4'>
                            <p
                                className='card-link'
                            >Explore Trousers</p>
                        </div>
                    </Link>

                    <Link href='/' className="card bg-[#1F1F1F]">
                        <div className='flex h-[87%] items-center justify-center'>
                            <h2 className='card-txt text-[#949494]'>Shoes</h2>
                        </div>
                        <div className='p-4'>
                            <p
                                className='card-link'
                            >Explore Shoes</p>
                        </div>
                    </Link>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default page