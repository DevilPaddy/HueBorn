import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import SignupForm from "../../components/SignupForm" 
import Link from 'next/link'

export default async function SignupPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex md:items-center items-start justify-center min-h-screen px-2 mt-8 md:mt-0">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#ffffff] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create your account
        </h2>
        
        <SignupForm />

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}