'use client';
import React, { use } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { IconType } from 'react-icons';

type PathItem = {
  name: string;
  url: string;
  icon: IconType;
};

type SubPathTypes = {
  [key: string]: PathItem[];
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = use(params) as { category: string };

  console.log("Selected Category:", category);

  const subPath: SubPathTypes = {
    lineneshirt: [
      { name: "The Daily Ritual", url: "path1-linen", icon: IoMdAdd },
      { name: "The Resort Escape", url: "path2-linen", icon: IoMdAdd },
      { name: "The City Classic", url: "path3-linen", icon: IoMdAdd },
    ],
    poloshirt: [
      { name: "Path 1: The Everyday Essential", url: "path1-polo", icon: IoMdAdd },
      { name: "Path 2: The Weekend Vibe", url: "path2-polo", icon: IoMdAdd },
      { name: "Path 3: The Luxe Comfort", url: "path3-polo", icon: IoMdAdd },
    ],
    trousers: [
      { name: "Path 1: The Tailored Fit", url: "path1-trouser", icon: IoMdAdd },
      { name: "Path 2: The Casual Ease", url: "path2-trouser", icon: IoMdAdd },
      { name: "Path 3: The Workday Smart", url: "path3-trouser", icon: IoMdAdd },
    ],
    shoes: [
      { name: "Path 1: The Classic Oxford", url: "path1-shoe", icon: IoMdAdd },
      { name: "Path 2: The Street Sneaker", url: "path2-shoe", icon: IoMdAdd },
      { name: "Path 3: The Everyday Loafer", url: "path3-shoe", icon: IoMdAdd },
    ],
  };

  const path = subPath[category] ?? [];

  return (
    <div className='path-div bg-[#005F60] min-h-screen'>
      <div className='fixed w-full top-0 left-0 z-50'>
        <Navbar />
      </div>

      <div className='w-full h-auto md:px-[3.8vw] md:py-[1.4vw] px-[3vh] py-[.2vh] mt-20 md:mt-16'>
        <div className="path-txt flex flex-col items-center ">
          <Link href='/categories' className='sub-link-path flex items-center mt-4'>
            <IoIosArrowRoundBack />Back to Home Page
          </Link>
          <h4 className='title-txt-path md:text-[3vw] font-bold leading-12 mt-1.5 mb-4 text-center'>
            Curation: Your {category} Journey
          </h4>
          <p className='sub-txt-path text-center'>Select your path to curated excellence.</p>
        </div>

        <div className="card-container">
          {path.map(({ name, url, icon: Icon }) => (
            <div key={url} className="card-path-sec">
              <div className="card-icon p-3 rounded-full border-2 border-[#EDE8E2] bg-[#005F60]
              flex items-center justify-center">
                <Icon color='#EDE8E2' size='32' />
              </div>
              <div className="card-title">
                <h3 className='text-[#ede8e2] text-[5vh] md:text-[2.6vw] font-bold leading-12'>{name}</h3>
              </div>
              <div className="card-btn">
                <Link
                  className='md:px-[4vw] md:py-[1vw] bg-[#EDE8E2] border-2 border-[#ede8e2] text-[#005F60] hover:bg-[#005F60]
                  hover:text-[#ede8e2] text-center hover:border-[#005F60] md:text-[1.12vw] font-semibold duration-200 ease-in-out
                  px-[6vw] py-[1.5vw] text-[2vh]'
                  href={`/${category}/${url}`}
                >
                  Explore The Picks
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
