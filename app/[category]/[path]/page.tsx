import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Link from 'next/link';


const page = () => {
  return (
    <div>
      <div className='fixed w-full top-0 left-0 z-50'>
        <Navbar />
      </div>

      <div className="pt-20">
        <div className="path-txt flex flex-col items-center mb-6">
          <h4 className='title-txt md:text-[3vw] font-bold leading-12 mt-1.5 mb-4 text-center'>
            Curation: Your Journey
          </h4>
          <p className='sub-txt text-center'>Select your path to curated excellence.</p>
        </div>

        {/* products section */}
        <div className="product-sec">
          <div className="product-card">
            <div className="img-div"></div>
            <div className="product-info">
              <h1></h1>
              <p className="desc"></p>
              <Link href='/'>Explore at Brand</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default page