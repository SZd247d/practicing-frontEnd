import Image from 'next/image'
import {
  SearchIcon,
  MenuIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { itemsState } from '../atoms/itemsState'

function Header() {


function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [items, setItems] = useRecoilState(itemsState)

  return (
    <header className="">
      {/* Header Top */}
      <div className="flex w-full grow items-center bg-amazon_blue p-1 py-2">
        <div className="mt-2 flex grow items-center sm:grow-0">
          <Image
            onClick={() => router.push('/')}
            className="cursor-pointer"
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
          />
        </div>

        <div className="hidden h-10 grow cursor-pointer items-center justify-between rounded-md bg-yellow-400 hover:bg-yellow-500 sm:flex">
          <input
            type="text"
            className="h-full w-6 flex-shrink grow rounded-l-md p-2 px-4 focus:outline-none"
          />
          <SearchIcon className=" h-12 p-3" />
        </div>

        {/* Right */}
        <div className="mx-6 flex items-center space-x-6 whitespace-nowrap text-xs text-white">
          <div className="link">
            <p>Hello, Zaki Sellali!</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `Hello ${session.user.name}` : `Sign In`}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div className="link relative flex items-center">
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-yellow-400 text-center font-bold text-black md:right-10">
              0
              </span>
          <div
            onClick={() => router.push('/checkout')}
            className="link relative flex items-center"
          >
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-yellow-400 text-center font-bold text-black md:right-10">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="mt-2 hidden font-extrabold md:inline md:text-sm">
              Basket
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Header Bottom */}

      <div className="flex items-center space-x-3 bg-amazon_blue-light p-2 pl-6 text-sm text-white">
        <p className="link flex items-center">
          <MenuIcon className="mr-1 h-6 pr-2" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronic</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  )
}
}
export default Header
