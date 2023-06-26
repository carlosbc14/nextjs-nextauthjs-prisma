'use client'
import { useSession, signOut } from 'next-auth/react'

export default function Dashboard() {
  const { data: session, status } = useSession()

  return (
    <div className="flex flex-col w-full justify-center border-y mt-8 p-8 border-gray-200 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:w-auto lg:border lg:rounded-xl lg:mx-24 lg:mt-10">
      <h2 className="text-3xl uppercase text-center mb-4">Dashboard</h2>

      {status === 'loading' && (
        <div className="text-center">Loading</div>
      )}

      {status === 'authenticated' && (
        <>
          <div>
            <p><strong>ID:</strong> {session.user.id}</p>
            <p><strong>Name:</strong> {session.user.name}</p>
            <p><strong>Email:</strong> {session.user.email}</p>
          </div>
          <button className="w-full rounded-xl mt-6 p-2 bg-blue-800 hover:bg-blue-900" onClick={signOut}>
            Logout
          </button>
        </>
      )}
    </div>
  )
}
