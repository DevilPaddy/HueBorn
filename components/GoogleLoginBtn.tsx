'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/profile' })}
      className="flex items-center justify-center gap-2 w-full px-4 py-2 mt-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  )
}
