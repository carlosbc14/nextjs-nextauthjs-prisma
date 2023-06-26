import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { database } from '@/libs/prisma'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials

        let user = await database.user.findFirst({ where: { email } })
        if (!user) throw new Error('Invalid email')
        
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) throw new Error('Invalid credentials')

        delete user.password

        return user
      }
    })
  ],
  callbacks: {
    session({ session, token }) {
      session.user = token.user

      return session
    },
    jwt({ token, user }) {
      if (user) token.user = user

      return token
    }
  },
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }