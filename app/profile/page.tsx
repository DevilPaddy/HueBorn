'use client'

import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaUserCircle, FaTrash } from 'react-icons/fa' 
import Link from 'next/link'
import toast from "react-hot-toast";

interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  productUrl: string;
}

const ProfilePage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')

    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const resWishlist = await fetch('/api/profile/wishlist') 
          
          if (resWishlist.ok) {
            const data = await resWishlist.json()
            setWishlist(data.wishlist || [])
          }

          const resAdmin = await fetch('/api/isadmin')
          if (resAdmin.ok) {
            const data = await resAdmin.json()
            setIsAdmin(data.isAdmin)
          }
        } catch (error) {
          console.error('Error fetching data:', error)
          toast.error("Failed to load profile data")
        } finally {
            setLoading(false)
        }
      }
      fetchData()
    }
  }, [status, router])

  const handleRemove = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    const originalList = [...wishlist];
    setWishlist(wishlist.filter((item) => item.productId !== productId));

    try {
      const res = await fetch('/api/profile/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        toast.success("Item removed");
        router.refresh();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      setWishlist(originalList); 
      toast.error("Could not remove item");
    }
  };

  if (status === 'loading' || loading)
    return <p className="text-center mt-10">Loading...</p>

  if (!session) return null

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      
      {/* Profile Card */}
      <div className="bg-zinc-100 p-8 rounded-xl shadow-sm w-full max-w-md text-center">
        <FaUserCircle size={80} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">{session.user?.name}</h2>
        <p className="text-gray-500 mb-6">{session.user?.email}</p>

        {isAdmin && (
          <Link
            href="/admin"
            className="block w-full bg-black text-white px-4 py-2 rounded-md mb-3 hover:opacity-80 transition"
          >
            Admin Dashboard
          </Link>
        )}

        <button
          onClick={() => {
            toast.success("See you later!");
            signOut({ callbackUrl: "/login" });
          }}
          className="w-full border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>

      {/* Wishlist Section */}
      <div className="mt-10 w-full max-w-4xl">
        <h3 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">My Wishlist ({wishlist.length})</h3>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg border border-dashed">
            <p className="text-gray-500">No items in wishlist yet.</p>
            <Link href="/#categories" className="text-blue-600 hover:underline mt-2 inline-block">
                Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div 
                key={item.productId} 
                className="group relative bg-white shadow-sm rounded-lg overflow-hidden hover:scale-105 hover:shadow-md transition"
              >
                {/* Image Link */}
                <Link href={`${item.productUrl}`}>
                    <div className="relative h-48 w-full bg-gray-200">
                    <img
                        src={item.productImage || "/placeholder.png"}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                    />
                    </div>
                </Link>

                {/* Content */}
                <div className="p-3">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.productName}
                    </h4>
                    
                    <div className="flex justify-between items-center mt-3">
                         <Link 
                           href={`${item.productUrl}`}
                           className="text-xs text-blue-600 font-semibold hover:underline"
                         >
                            View
                         </Link>

                        {/* 🗑️ Delete Button */}
                        <button
                            onClick={(e) => handleRemove(e, item.productId)}
                            className="text-gray-400 hover:text-red-500 transition p-1"
                            title="Remove from wishlist"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage