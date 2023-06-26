'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    const res = await signIn('credentials', { email, password, redirect: false })

    if (res.error) setError(res.error)
    else router.push('/dashboard')
  }

  return (
    <div className="flex w-full justify-center border-y mt-8 p-8 border-gray-200 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:w-auto lg:border lg:rounded-xl lg:mx-24 lg:mt-10">
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl uppercase text-center mb-4">Login</h2>

        <input
          className="w-full rounded-xl mb-4 p-2 border border-gray-200 dark:bg-zinc-800/30 dark:border-neutral-800"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded-xl mb-4 p-2 border border-gray-200 dark:bg-zinc-800/30 dark:border-neutral-800"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="bg-red-600 border border-red-950 rounded-xl p-2">{error}</div>
        )}

        <button className="w-full rounded-xl mt-6 p-2 bg-blue-800 hover:bg-blue-900" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}
