import Head from 'next/head'
import { Inter } from '@next/font/google'
import ProductCard from '../components/ProductCard'
import type { NextPage, GetStaticProps } from "next"
import { Category, Collection, Product } from '../typing'
import { getCategories, getCollections, getProducts } from '../services'


const inter = Inter({ subsets: ['latin'] })


const Home: NextPage<{
  products: Product[]
}> = (
  {
    products
  }
) => {
    return (
      <>
        <Head>
          <title>Duka Moto</title>
          <meta name="description" content="Kenya's favorite march site" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-6'>
          {
            products.map((product, index) => <ProductCard key={index} product={product} />)
          }
        </main>

      </>
    )
  }

export default Home

export const getStaticProps: GetStaticProps<{
  products: Product[],
  categories: Category[]
  collections: Collection[]
}> = async () => {
  const products = await getProducts()
  const categories = await getCategories()
  const collections = await getCollections()
  return {
    props: {
      products,
      categories,
      collections
    },
    revalidate: 10
  }
}