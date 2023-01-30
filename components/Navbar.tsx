import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import logo from "../public/logo-2-trimmy.png"
import { BsCart3 } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { overrideCart } from '../redux/features/cart/cartSlice'
import type { RootState } from '../redux/app/store'
import { Category } from '../typing'
import { useRouter } from 'next/router'

type Props = {
    categories: Category[]
}

const Navbar = ({ categories }: Props) => {
    const router = useRouter()
    const { slug } = router.query
    const total = useSelector((state: RootState) => state.cart.total)
    const items = useSelector((state: RootState) => state.cart.items)

    const dispatch = useDispatch()

    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) {
            dispatch(overrideCart(JSON.parse(stored)))
        }
    }, [dispatch])
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

                {
                    categories && categories.map((categ, index) =>
                        <Link href={`/categories/${categ.slug}`} key={index}>
                            <span
                                className= {categ.slug === slug ? 'font-semibold text-sm tracking-wide mr-4 uppercase hover:underline hidden md:inline-block text-indigo-700 underline':
                                'font-semibold text-sm tracking-wide mr-4 uppercase hover:underline hidden md:inline-block'}>
                                {categ.name}
                            </span>
                        </Link>)
                }
            </div>

            <Link href="/cart">
                <div className='relative flex items-center cursor-pointer'>
                    <span className='absolute top-[-52%] left-[15%] px-2 rounded-full bg-indigo-600 text-sm text-white'>{items.length - 1}</span>
                    <BsCart3 className=' text-[26px] mr-4 text-gray-400' />
                    <span className='tracking-wide font-semibold text-sm md:text-base'>KSH{total.toFixed(2)}</span>
                </div>
            </Link>
        </div>
    )
}

export default Navbar