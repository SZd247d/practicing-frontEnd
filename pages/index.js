import Head from 'next/head'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className="h-screen bg-slate-600">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
    </div>
  )
}

export default Home
