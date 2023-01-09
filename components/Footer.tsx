import React from 'react'
import { BsLinkedin, BsGithub } from "react-icons/bs"
type Props = {}

const Footer = (props: Props) => {
    return (
        <div className='grid grid-cols-3 gap-4 max-w-7xl px-6 mx-auto my-12'>
            <ul className='col-span-3 md:col-span-1 mb-4 space-y-3'>
                <h3 className='uppercase text-gray-400 text tracking-wide'>Categories</h3>
                <li className='text-gray-400 cursor-pointer hover:text-black tracking-wide'>T-Shirts</li>
                <li className='text-gray-400 cursor-pointer hover:text-black tracking-wide'>Hoodies</li>
                <li className='text-gray-400 cursor-pointer hover:text-black tracking-wide'>Accessories</li>
            </ul>

            <ul className='col-span-3 md:col-span-1 mb-4 space-y-3'>
                <h3 className='uppercase text-gray-400 text tracking-wide'>Collections</h3>
                <li className='text-gray-400 cursor-pointer hover:text-black tracking-wide'>New In</li>
                <li className='text-gray-400 cursor-pointer hover:text-black tracking-wide'>Throwback</li>
            </ul>

            <div className=' col-span-3 py-6 border-gray-200 border-t-2 flex justify-between items-center'>
                <p className=' text-gray-400 tracking-wide'>© 2023 Duka Moto. All rights reserved.</p>

                <div className='flex space-x-6 items-center'>
                    <BsLinkedin className='text-[26px] text-gray-600 hover:text-gray-800 cursor-pointer rounded-sm' />
                    <BsGithub className='text-[26px] text-gray-600 hover:text-gray-800 cursor-pointer'  />
                </div>
            </div>

        </div>
    )
}

export default Footer