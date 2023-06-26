import { NextResponse } from 'next/server'
import { database } from '@/libs/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { email, name, password } = await request.json()

    if (!email || !name || !password) return NextResponse.json({
      message: 'Email, name and password are required'
    }, { status: 400 })

    const emailRE = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email.match(emailRE)) return NextResponse.json({
      message: 'Email is invalid'
    }, { status: 400 })

    if (password.length < 6) return NextResponse.json({
      message: 'Password must be at least 6 characters'
    }, { status: 400 })

    const user = await database.user.findFirst({ where: { email } })
    if (user) return NextResponse.json({
      message: 'User already exists'
    }, { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await database.user.create({
      data: { email, name, password: hashedPassword }
    })

    return NextResponse.json(newUser)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
