import Head from 'next/head'
import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Header from '../components/Header'
import ProductFeed from '../components/ProductFeed'

const Home = () => {
  const [products, SetProducts] = useState([])

  useEffect(async () => {
    const data = await fetch('https://fakestoreapi.com/products')
    const products = await data.json()

    SetProducts(products)
  }, [])

  // console.log(products)

  return (
    <div className="min-h-screen bg-slate-300">
      <Head>
        <title>AmazonClone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="mx-auto max-w-screen-2xl">
        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  )
}

export default Home

// I Don't Know Why fetching data from fakeStoreAPI ON THE SERVER is not Working ? Swithcing to useEffect() .

// export async function getStaticProps(context) {
//   // const products = await fetch('https://fakestoreapi.com/products').then(
//   //   (res) => res.json()
//   // )

//   const data = await fetch('https://fakestoreapi.com/products')
//   const products = await data.json()

//   return {
//     props: {
//       products,
//     },
//   }
// }
