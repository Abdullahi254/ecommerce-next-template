import Image from 'next/image'
import React from 'react'
import testImg from "../public/test3.png"
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'
type Props = {}

const CartCard = (props: Props) => {
    return (
        <div className='bg-gray-100 p-6 flex justify-between items-center rounded-md '>
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
                    <p className=' font-semibold'>Yellow Shirt</p>
                    <p className=' text-xs text-gray-400 hover:text-indigo-600 cursor-pointer'>X Remove</p>
                </div>
            </div>

            <div className='hidden md:flex flex-col items-center space-y-1'>
                <AiOutlineUp className='text-gray-400 hover:text-indigo-600 cursor-pointer' />
                <span>3</span>
                <AiOutlineDown className='text-gray-400 hover:text-indigo-600 cursor-pointer' />
            </div>

            <div className=' flex flex-col items-center'>
                <p className=' font-semibold'>KSH300.00</p>
                <p className=' text-xs text-gray-400'>KSH100.00 each</p>
            </div>

        </div>
    )
}

export default CartCard