'use client'
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";


import Link from 'next/link'

const page = () => {
    return (
        <div id='categories' className='container scroll-mt-10 mt-2 mb-2 mx-auto'>

            <div className="category-section bg-[#ede8e2] flex  flex-col justify-center 
            items-center w-full md:px-[3.8vw] md:py-[1.4vw] px-[3vh] py-[.2vh]">
                <div className="flex flex-col items-center justify-center">
                    <h4 className='title-txt title-txt-category'>Shop by Category</h4>
                    <p className='sub-txt'>Timeless Style Awaits</p>
                </div>

                <div className="card-container w-full h-auto">
                    <Link
                        href='/linenshirt'
                        className="card bg-[#868686]">
                        <div className='flex h-[87%] items-center justify-center'>
                            <h2 className='card-txt text-[#38393A]'>Linen Shirt</h2>
                        </div>
                        <div className='p-4'>
                            <p className='card-link'
                            >Explore Line Shirt</p>
                        </div>
                    </Link>

                    <Link href='/poloshirt' className="card bg-[#00393A]">
                        <div className='flex h-[87%] items-center justify-center'>
                            <h2 className='card-txt text-[#949494]'>Polo Shirt</h2>
                        </div>
                        <div className='p-4'>
                            <p
                                className='card-link'
                            >Explore Polo Shirt</p>
                        </div>
                    </Link>

                    <Link href='/trousers' className="card bg-[#6B6B6B]">
                        <div className='flex h-[87%] items-center justify-center'>
                            <h2 className='card-txt text-[#38393A]'>Trousers</h2>
                        </div>
                        <div className='p-4'>
                            <p
                                className='card-link'
                            >Explore Trousers</p>
                        </div>
                    </Link>

                    <Link href='/shoes' className="card bg-[#1F1F1F]">
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
        </div>
    )
}

export default page