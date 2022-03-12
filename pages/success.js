import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../components/Header'

function success() {
  const router = useRouter()
  return (
    <div className="h-screen bg-gray-100">
      <Header />

      <main className="mx-auto max-w-screen-lg">
        <div className="flex flex-col bg-white p-10">
          <div className="mb-5 flex items-center space-x-2">
            <CheckCircleIcon className="h-10 text-green-500" />
            <h1 className="text-3xl">
              Thank you , your order has been confirmed!
            </h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            deserunt nihil possimus distinctio! Esse debitis nam, libero
            delectus et possimus!
          </p>
          <button
            onClick={() => router.push('/orders')}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  )
}

export default success
