'use client';

import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ProductProps {
  product: {
    _id: string;
    name: string;
    image: string;
    url: string;
  }
}

export default function HeartBtn({ product }: ProductProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error("Please login to save items");
      router.push('/login');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/profile/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          productName: product.name,
          productImage: product.image,
          productUrl: product.url,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.action === 'add') {
          setIsLiked(true);
          toast.success("Added to Wishlist ❤️");
        } else {
          setIsLiked(false);
          toast.success("Added to Wishlist ❤️");
        }
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={isLoading}
      className="absolute top-3 right-3 z-10
    w-9 h-9 flex items-center justify-center
    rounded-full
    bg-white/90
    border border-gray-200
    backdrop-blur-sm
    shadow-md
    transition-all duration-300
    hover:scale-110 hover:bg-white
    active:scale-95
    group"
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
      ) : isLiked ? (
        <FaHeart className="text-red-500 text-[18px] drop-shadow-sm" />
      ) : (
        <FaRegHeart className="text-gray-700 text-[18px]" />
      )}
    </button>

  );
}