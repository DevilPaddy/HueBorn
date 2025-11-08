import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { connectDB } from '../../../lib/dbconfig'
import User from '../../../models/user'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    await connectDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('SIGNUP_ERROR', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
