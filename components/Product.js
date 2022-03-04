import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import CurrencyFormat from 'react-currency-format'

const MIN_RATING = 1
const MAX_RATING = 5

function Product({ id, title, description, category, price, image }) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  )

  const [hasPrime] = useState(Math.random() > 0.5)

  return (
    <div className="relative z-30 m-5 flex flex-col rounded-sm bg-slate-100 p-10">
      <p className="absolute top-2 right-2 my-3 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} alt="" height={200} width={200} objectFit="contain" />

      <h3>{title}</h3>

      <div className="flex">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <StarIcon className="h-5 text-cyan-900" />
          ))}
      </div>

      <p className="my-2 text-xs line-clamp-2">{description}</p>

      <div className="mb-5">
        <CurrencyFormat
          value={price}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
          renderText={(value) => <div>{value}</div>}
        />
      </div>

      {hasPrime && (
        <div className="-mt-5 flex items-center space-x-2">
          <img src="http://links.papareact.com/fdw" alt="" className="w-12" />
          <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
        </div>
      )}

      <button className="button mt-auto">Add to basket</button>
    </div>
  )
}

export default Product
