import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { selector, useRecoilState } from 'recoil'
import { itemsState } from '../atoms/itemsState'

function CheckoutProduct({
  id,
  title,
  description,
  category,
  price,
  image,
  rating,
  hasPrime,
}) {
  const [items, setItems] = useRecoilState(itemsState)

  const products = {
    id,
    title,
    description,
    category,
    price,
    image,
    rating,
    hasPrime,
  }
  console.log(id)

  const addItemToAtomState = () => {
    setItems([...items, products])
  }

  // const removeItemToAtomState = (id) => {
  //   const index = items.findIndex((item) => item.id === id)
  //   console.log(index)

  //   let newItems = [...items]

  //   if (index >= 0) {
  //     newItems.splice(index, 1)
  //   } else {
  //     console.warn(
  //       `can't remove product (id: ${id}) as it is not in the basket`
  //     )
  //   }

  //   setItems(newItems)
  // }
  const index = items.findIndex((item) => item.id === id)

  const removeItem = (index) => {
    let newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  // const removeItemsFromState = selector({
  //   key: '',
  //   get: ({ get }) => {
  //     const items = get(itemsState)
  //     let newValue = [...items]
  //     if (index >= 0) {
  //       newValue.splice(index, 1)
  //     } else {
  //       console.warn(
  //         `can't remove product (id: ${id}) as it is not in the basket`
  //       )
  //     }
  //     return newValue
  //   }, // get the current value of itemsState atom
  //   set: ({ set }, newValue) => {
  //     set(itemsState, newValue)
  //   }, // set the new value of itemsState atom
  // })

  return (
    <div className="my-12 grid grid-cols-5">
      <Image src={image} alt="" height={200} width={200} objectFit="contain" />

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <h3>{title}</h3>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-cyan-900" />
            ))}
        </div>

        <p className="my-2 text-sm line-clamp-3">{description} </p>
        <CurrencyFormat
          value={price}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
          renderText={(value) => <div>{value}</div>}
        />

        {hasPrime && (
          <div className="mt-5 flex items-center space-x-2">
            <img
              src="http://links.papareact.com/fdw"
              alt=""
              className="w-12"
              loading="lazy"
            />
            <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
          </div>
        )}
      </div>

      <div className="my-auto flex flex-col space-y-2 justify-self-end">
        <button onClick={addItemToAtomState} className="button mt-auto">
          Add to basket
        </button>
        <button onClick={removeItem} className="button mt-auto">
          Remove from basket
        </button>
      </div>
    </div>
  )
}

export default CheckoutProduct
