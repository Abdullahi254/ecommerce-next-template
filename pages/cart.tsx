import React from 'react'
import CartCard from '../components/CartCard'

type Props = {}

const cart = (props: Props) => {
  return (
    <div className='max-w-7xl mx-auto px-4 space-y-4 my-6'>
        <CartCard/>
        <CartCard/>
        <CartCard/>
        <CartCard/>
    </div>
  )
}

export default cart