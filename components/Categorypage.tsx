'use client'

import Link from 'next/link'
import Image from 'next/image';

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
                        href="/linenshirt"
                        className="relative group block w-full h-[420px] overflow-hidden rounded-lg"
                    >
                        <Image
                            src="https://res.cloudinary.com/dmkniypxd/image/upload/v1765615537/portrait-handsome-bearded-man-outside_avc9co.jpg"
                            alt="Linen Shirt"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                        <div className="relative z-10 h-full flex flex-col justify-between p-6">
                            <div className="flex items-center justify-center h-full">
                                <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
                                    Linen Shirt
                                </h2>
                            </div>

                            <p className="text-white text-sm underline text-center">
                                Explore Linen Shirt
                            </p>
                        </div>
                    </Link>


                    <Link
                        href="/linenshirt"
                        className="relative group block w-full h-[420px] overflow-hidden rounded-lg"
                    >
                        <Image
                            src="https://res.cloudinary.com/dmkniypxd/image/upload/v1765615442/low-section-man-standing-rock-against-blue-sky_e2tc7f.jpg"
                            alt="Linen Shirt"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                        <div className="relative z-10 h-full flex flex-col justify-between p-6">
                            <div className="flex items-center justify-center h-full">
                                <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
                                    Trousers
                                </h2>
                            </div>

                            <p className="text-white text-sm underline text-center">
                                Explore Trousers
                            </p>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default page