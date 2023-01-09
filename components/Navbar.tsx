import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../public/logo-2-trimmy.png"
import {BsCart3} from "react-icons/bs"

type Props = {}

const Navbar = (props: Props) => {
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

            <div className=' flex items-center cursor-pointer'>
                <BsCart3 className=' text-[26px] mr-4 text-gray-400'/>
                <span className='tracking-wide'>KSH0.00</span>
            </div>

        </div>
    )
}

export default Navbar