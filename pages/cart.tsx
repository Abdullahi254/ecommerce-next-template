import React from 'react'
import CartCard from '../components/CartCard'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/app/store'

type Props = {}

const Cart = (props: Props) => {
  const itemList = useSelector((state:RootState)=>state.cart.items)
  return (
    <div className='max-w-7xl mx-auto px-4 space-y-4 my-6'>
        {
          itemList.map((item,index)=>{
            if(index>0){
              return <CartCard key={index} item={item} index={index}/>
            }return
          })
        }
    </div>
  )
}

export default Cart