'use client'
import Link from 'next/link'
import { FaRegSadTear } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#005F60] text-[#EDE8E2] text-center px-4">
      <FaRegSadTear size={100} className="text-[#EDE8E2] mb-6 animate-bounce" />

      <h1 className="text-5xl font-bold mb-4">Oops! Lost in Style? 👔</h1>
      <p className="text-lg mb-8 max-w-lg">
        Seems like you’ve wandered off the runway. The page you’re looking for might have gone out of fashion 👗💨
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 bg-[#EDE8E2] text-[#005F60] px-5 py-3 rounded-full font-semibold hover:bg-[#dcd7d2] transition"
      >
        <IoMdHome size={22} />
        Back to Home
      </Link>

      <p className="mt-8 text-sm opacity-75">
        P.S. Our designer swears this page looked better yesterday 😅
      </p>
    </div>
  )
}
