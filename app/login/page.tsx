import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import LoginForm from "../../components/LoginForm"
import Link from "next/link"
import GoogleLoginButton from "../../components/GoogleLoginBtn"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/profile")
  }

  return (
    <div className="flex md:items-center items-start justify-center min-h-screen px-2 mt-8 md:mt-0">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#ffffff] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign in to your account
        </h2>

        <LoginForm />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">Or continue with</span>
          </div>
        </div>

        <GoogleLoginButton />

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
