import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../public/logo-2-trimmy.png"
import { BsCart3 } from "react-icons/bs"
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/app/store'

type Props = {}

const Navbar = (props: Props) => {
    const total = useSelector((state: RootState) => state.cart.total)
    return (
        <div className='max-w-7xl mx-auto my-4 p-4 px-6 flex justify-between'>

            <div className=' flex items-center'>
                <Link href="/">
                    <Image
                        src={logo}
                        alt="logo"
                        width={70}
                        priority
                        className=' cursor-pointer mr-4'
                    />
                </Link>

                <Link href="/">
                    <span className=' font-semibold text-sm tracking-wide mr-4 uppercase hover:underline hidden md:inline-block'>T-Shirts</span>
                </Link>
                <Link href="/">
                    <span className=' font-semibold text-sm tracking-wide mr-4 uppercase hover:underline hidden md:inline-block'>Hoodies</span>
                </Link>
                <Link href="/">
                    <span className=' font-semibold text-sm tracking-wide mr-4 uppercase hover:underline hidden md:inline-block'>Accessories</span>
                </Link>
            </div>

            <Link href="/cart">
                <div className=' flex items-center cursor-pointer'>
                    <BsCart3 className=' text-[26px] mr-4 text-gray-400' />
                    <span className='tracking-wide font-semibold text-sm md:text-base'>KSH{total.toFixed(2)}</span>
                </div>
            </Link>
        </div>
    )
}

export default Navbar