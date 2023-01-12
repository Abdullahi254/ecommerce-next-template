import Image from 'next/image'
import React from 'react'
import testImg from "../public/test3.png"
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'
import type { RootState } from '../redux/app/store'
import {useDispatch} from "react-redux"
import {addToCart, removeFromCart} from '../redux/features/cart/cartSlice'
type Props = {
    item:ReturnType<(state:RootState)=>typeof state.cart.items[0]>
    index:number
}

const CartCard = ({item,index}: Props) => {
    const dispatch = useDispatch()
    const removeHandler = ()=>{
        dispatch(removeFromCart(index))
    }
    const increaseItemQuantity = ()=>{
        const newItem = {
            ...item,
            variant: item.variant,
            price: item.price,
            quantity: 1,
            subTotal: item.price * 1,
          }
        dispatch(addToCart(newItem))
    }
    return (
        <div className='bg-gray-100 p-6 flex justify-between items-center rounded-md relative'>
            <div className='flex space-x-2 items-center'>
                <Image
                    src={testImg}
                    alt="testImg"
                    width={800}
                    height={800}
                    priority
                    className='w-[56px] h-[56px] md:w-[72px] md:h-[72px]'
                />
                <div>
                    <p className=' font-semibold'>{item.name}-<span className='text-xs font-semi-bold text-gray-500'>({item.variant})</span></p>
                    <p className=' text-xs text-gray-400 hover:text-indigo-600 cursor-pointer' onClick={removeHandler}>X Remove</p>
                </div>
            </div>

            <div className='absolute left-1/2 hidden md:flex flex-col items-center space-y-1'>
                <AiOutlineUp className='text-gray-400 hover:text-indigo-600 cursor-pointer' onClick={increaseItemQuantity}/>
                <span>{item.quantity}</span>
                <AiOutlineDown className='text-gray-400 hover:text-indigo-600 cursor-pointer' />
            </div>

            <div className=' flex flex-col items-center'>
                <p className=' font-semibold'>KSH{item.subTotal.toFixed(2)}</p>
                <p className=' text-xs text-gray-400'>KSH{(item.subTotal/item.quantity).toFixed(2)} each</p>
            </div>

        </div>
    )
}

export default CartCard