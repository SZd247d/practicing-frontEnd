import Head from 'next/head'
import Banner from '../components/banner'
import Header from '../components/Header'
import ProductFeed from '../components/ProductFeed'

const Home = ({ products }) => {
  console.log(products)
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

export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  )

  return {
    props: {
      products,
    },
  }
}
