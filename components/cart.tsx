//THIS PAGE IS SUPPOSED TO BE AT THE PAGE DIRECTORY
//I PLACED IT HERE SINCE I DO NOT NEED CART PAGE SINCE I'M USING SNIPCART WHICH IS PROVIDING CART HANDLING
import React from 'react'
import CartCard from './CartCard'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/app/store'
import type {GetStaticProps } from "next"
import { Category, Collection} from '../typing'
import { getCategories, getCollections} from '../services'

type Props = {}

const Cart = (props: Props) => {
  const itemList = useSelector((state: RootState) => state.cart.items)
  const total = useSelector((state: RootState) => state.cart.total)
  return (
    <div className='max-w-7xl mx-auto px-4 space-y-4 my-6'>
      {
        itemList.map((item, index) => {
          if (index > 0) {
            return <CartCard key={index} item={item} index={index} />
          } return
        })
      }

      <div className='p-4 border-t-2 flex justify-end items-center'>
        <div className='flex flex-col space-y-4 items-center'>
          <div className='text-center space-y-1'>
            <p className='text-sm md:text-base'>Sub total</p>
            <p className=' text-indigo-700 font-bold text-lg md:text-xl'>KSH{total.toFixed(2)}</p>
          </div>
          <button
            className='bg-indigo-600 py-2 px-4 text-white
          rounded-md font-semibold uppercase hover:bg-gray-500'
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart

export const getStaticProps: GetStaticProps<{
  categories: Category[]
  collections: Collection[]
}> = async () => {

  const categories = await getCategories()
  const collections = await getCollections()
  return {
    props: {
      categories,
      collections
    },
    revalidate: 10
  }
}