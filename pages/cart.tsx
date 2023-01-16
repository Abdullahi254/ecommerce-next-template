import React from 'react'
import CartCard from '../components/CartCard'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/app/store'

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