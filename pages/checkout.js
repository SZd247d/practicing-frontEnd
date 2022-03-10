import { useSession } from 'next-auth/react'
import Image from 'next/image'
import CurrencyFormat from 'react-currency-format'
import { selector, useRecoilState, useRecoilValue } from 'recoil'
import { itemsState } from '../atoms/itemsState'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from '../components/Header'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
  const [items, setItems] = useRecoilState(itemsState)
  const { data: session } = useSession()

  console.log(items)
  console.log(itemsState)

  const totalItemsState = selector({
    key: 'totalItemsState',
    get: ({ get }) => {
      const items = get(itemsState)
      const total = items.reduce((acc, item) => {
        return acc + item.price
      }, 0)
      return total
    },

    // const total = items.reudce((acc, item) => acc + item.price, 0)
    // return {
    //   total,
    // }
  })

  const totalItems = useRecoilValue(totalItemsState)

  const createCheckoutSessions = async () => {
    const stripe = await stripePromise

    // Call Backend to create a checkout session
    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session.user.email,
    })

    // Redirect the user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    })

    if (result.error) alert(result.error.message)
  }

  return (
    <div className="min-h-screen bg-white ">
      <Header />

      <main className="mx-auto max-w-screen-2xl lg:flex ">
        {/* Left */}
        <div>
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
        </div>

        {/* Right */}

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2>
                Subtotal ({items.length} items):
                <span className="font-bold">
                  <CurrencyFormat
                    value={totalItems}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    renderText={(value) => <div>{value}</div>}
                  />
                </span>
              </h2>

              <button
                onClick={createCheckoutSessions}
                role="link"
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'cursor-not-allowed border-gray-200 from-gray-200 to-gray-500 text-gray-300'
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to Checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Checkout
