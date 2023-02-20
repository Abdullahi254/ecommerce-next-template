import Link from 'next/link'
import React from 'react'
import { BsLinkedin, BsGithub } from "react-icons/bs"
import { Category, Collection } from '../typing'
type Props = {
    categories: Category[]
    collections: Collection[]
}

const Footer = ({ categories, collections }: Props) => {
    return (
        <div className='grid grid-cols-3 gap-4 max-w-7xl px-6 mx-auto my-12'>
            <ul className='col-span-3 md:col-span-1 mb-4 w-fit'>
                <h3 className='uppercase text-gray-400 text tracking-wide my-3'>Categories</h3>
                {
                    categories && categories.map((categ, index) =>
                        <Link key={index} href={`/categories/${categ.slug}`}>
                            <li
                                className='text-gray-400 cursor-pointer hover:text-black tracking-wide my-3'
                            >
                                {categ.name}
                            </li>
                        </Link>

                    )
                }
            </ul>

            <ul className='col-span-3 md:col-span-1 mb-4 w-fit'>
                <h3 className='uppercase text-gray-400 text tracking-wide my-3'>Collections</h3>
                {
                    collections && collections.map((coll, index) =>
                        <Link key={index} href={`/collections/${coll.slug}`}>
                            <li
                                className='text-gray-400 cursor-pointer hover:text-black tracking-wide my-3'
                            >
                                {coll.name}
                            </li>
                        </Link>

                    )
                }
            </ul>

            <div className=' col-span-3 py-6 border-gray-200 border-t-2 flex justify-between items-center'>
                <p className=' text-gray-400 tracking-wide'>© 2023 Duka Moto. All rights reserved.</p>

                <div className='flex space-x-6 items-center'>
                    <Link href="https://linkedin.com/in/abdullahi-mohamud-aa04291b6" target="_blank">
                        <BsLinkedin className='text-[26px] text-gray-600 hover:text-gray-800 cursor-pointer rounded-sm' />
                    </Link>
                    <Link href="https://github.com/Abdullahi254" target="_blank">
                        <BsGithub className='text-[26px] text-gray-600 hover:text-gray-800 cursor-pointer' />
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Footer