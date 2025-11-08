'use client'

import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'

const ProfilePage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [wishlist, setWishlist] = useState<any[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated') {
      const fetchWishlist = async () => {
        const res = await fetch('/api/profile/wishlist')
        if (res.ok) {
          const data = await res.json()
          setWishlist(data.wishlist || [])
        }
      }
      fetchWishlist()
    }
  }, [status, router])

  if (status === 'loading')
    return <p className="text-center mt-10">Loading...</p>

  if (!session) return null

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <FaUserCircle size={80} className="mx-auto text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold">{session.user?.name}</h2>
        <p className="text-gray-500 mb-4">{session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Your Wishlist</h3>
        {wishlist.length === 0 ? (
          <p className="text-gray-500">No items in wishlist yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <Link
                key={item.productId}
                href={`/product/${item.productId}`}
                className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-full h-32 object-cover rounded-md"
                />
                <p className="mt-2 text-sm font-medium text-gray-700 text-center">
                  {item.productName}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
