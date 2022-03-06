import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { itemsState } from '../atoms/itemsState'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from '../components/Header'
import Product from '../components/Product'

function Checkout() {
  const [items, setItems] = useRecoilState(itemsState)
  console.log(items)
  console.log(itemsState)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-screen-2xl lg:flex">
        {/* Left */}
        <div className="m-5 grow shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col space-y-10 bg-slate-50 p-5">
            <h1 className="border-b pb-4 text-3xl">
              {items.length
                ? 'Your Shopping Basket'
                : 'Your Shopping Basket is empty'}
            </h1>
          </div>
        </div>

        {items.map((item, i) => (
          <CheckoutProduct key={item.id} {...item} />
        ))}

        {/* Right */}
        <div></div>
      </main>
    </div>
  )
}

export default Checkout
