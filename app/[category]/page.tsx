'use client'
import React from 'react'
import Link from 'next/link'
import { IoMdAdd } from "react-icons/io"
import { IconType } from 'react-icons'
import { useParams, useRouter } from 'next/navigation'

type PathItem = {
  name: string
  url: string
  icon: IconType
}

type SubPathTypes = Record<string, PathItem[]>

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()

  const categoryParam = params.category
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam

  const subPath: SubPathTypes = {
    linenshirt: [
      { name: "The Daily Ritual", url: "path1", icon: IoMdAdd },
      { name: "The Resort Escape", url: "path2", icon: IoMdAdd },
      { name: "The City Classic", url: "path3", icon: IoMdAdd },
    ],
    poloshirt: [
      { name: "The Everyday Essential", url: "path1", icon: IoMdAdd },
      { name: "The Weekend Vibe", url: "path2", icon: IoMdAdd },
      { name: "The Luxe Comfort", url: "path3", icon: IoMdAdd },
    ],
    trousers: [
      { name: "The Tailored Fit", url: "path1", icon: IoMdAdd },
      { name: "The Casual Ease", url: "path2", icon: IoMdAdd },
      { name: "The Workday Smart", url: "path3", icon: IoMdAdd },
    ],
    shoes: [
      { name: "The Classic Oxford", url: "path1", icon: IoMdAdd },
      { name: "The Street Sneaker", url: "path2", icon: IoMdAdd },
      { name: "The Everyday Loafer", url: "path3", icon: IoMdAdd },
    ],
  }

  if (!category || !(category in subPath)) {
    router.push('/404')
    return null
  }

  const path = subPath[category]

  return (
    <div className='path-div bg-[#005F60] min-h-screen mx-auto'>
      <div className='w-full h-auto md:px-[3.8vw] md:py-[1.4vw] px-[3vh] py-[.2vh]'>
        <div className="path-txt flex flex-col items-center">
          <h4 className='title-txt-path title-txt leading-12 text-center'>
            Curation: Your {category} Journey
          </h4>
          <p className='sub-txt-path text-center'>Select your path to curated excellence.</p>
        </div>

        <div className="card-container">
          {path.map(({ name, url, icon: Icon }) => (
            <div key={url} className="card-path-sec">
              <div className="card-icon p-3 rounded-full border-2 border-[#EDE8E2] bg-[#005F60] flex items-center justify-center">
                <Icon color='#EDE8E2' size='32' />
              </div>
              <div className="card-title">
                <h3 className='text-[#ede8e2] leading-11'>{name}</h3>
              </div>
              <div className="card-btn-div">
                <Link
                  className='card-btn bg-[#EDE8E2] border-2 border-[#ede8e2] text-[#005F60] hover:bg-[#005F60]
                  hover:text-[#ede8e2] text-center hover:border-[#005F60] font-medium duration-200 ease-in-out'
                  href={`/${category}/${url}`}
                >
                  Explore The Picks
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
