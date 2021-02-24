import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Link href="/ninjas">See Ninja Listing</Link>
      <Footer />
    </div>
  )
}
