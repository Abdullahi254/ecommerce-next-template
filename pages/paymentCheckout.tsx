import Image from "next/image";
import React, { createRef, useState, useEffect } from "react";
import logo from "../public/mpesa.png"
import type { GetStaticProps } from "next"
import { Address, Category, Collection, Item } from '../typing'
import { getCategories, getCollections } from '../services'
import { useRouter } from 'next/router'
import Link from "next/link";


const PaymentCheckout = () => {
    const phone = createRef<HTMLInputElement>()
    const [disable, setDisable] = useState<boolean>(true)
    const [items, setItems] = useState<Item[]>()
    const [address, setAddress] = useState<Address>()
    const [cancelUrl, setCancelUrl] = useState<string>("/")
    const [amount, setAmount] = useState<number>()
    const handleInputChange = () => {
        if (phone.current?.value.length !== 9) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }
    const router = useRouter()
    const { publicToken } = router.query

    useEffect(() => {
        if (typeof (publicToken) === 'string') {
            fetchInvoice(publicToken)
        }
    }, [publicToken])

    const fetchInvoice = async (token: string) => {
        try {
            const res = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session?publicToken=${token}`)
            if (res.ok) {
                const paymentSession = await res.json()
                if (paymentSession.invoice.items) {
                    setItems(paymentSession.invoice.items as Item[])
                    setAddress(paymentSession.invoice.shippingAddress as Address)
                    setAmount(paymentSession.invoice.amount as number)
                    setCancelUrl(paymentSession.PaymentAuthorizationRedirectUrl as string)
                }
                console.log(paymentSession.invoice)
            }
        } catch (err) {
            console.log("error fetching")
        }
    }

    return (
        <div className="max-w-6xl mx-auto bg-gray-50 rounded-sm p-6 shadow-md flex flex-col space-y-4">

            <div className="flex justify-center">
                <Image src={logo} alt="mpesa icon" width={120} height={120} priority className="w-auto h-auto" />
            </div>

            <div className="bg-white p-4 space-y-3">
                <h2 className="font-semibold text-xl lg:text-2xl text-center uppercase">Order Confirmation</h2>

                <div className="py-2 border-t-2  border-gray-400 pl-4">
                    <h3 className="text-lg font-semibold">order details:</h3>
                </div>

                <div className="py-4 border-t-2  border-gray-400 ">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    UNIT PRICE
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items?.map((item, index) => <tr key={index} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        KSH{item.unitPrice.toFixed(2)}
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t-2  border-gray-400 space-y-3">
                    <h3 className=" text-lg font-semibold">Shipping Information</h3>
                    <div className="space-y-1">
                        <p className="text-sm tracking-wide"><span className="font-semibold mr-2">Name:</span>{address?.name}</p>
                        <p className="text-sm tracking-wide"><span className="font-semibold mr-2">Country:</span>{address?.country}</p>
                        <p className="text-sm tracking-wide"><span className="font-semibold mr-2">City:</span>{address?.city}</p>
                        <p className="text-sm tracking-wide"><span className="font-semibold mr-2">Region:</span>{address?.region}</p>
                        <p className="text-sm tracking-wide"><span className="font-semibold mr-2">Street:</span>{address?.streetAndNumber}</p>
                        <p className="text-sm tracking-wide"><span className="font-semibold mr-2">Postal-Code:</span>{address?.postalcode}</p>
                    </div>
                </div>

                <div className="p-4 border-t-2  border-gray-400 space-y-3 flex justify-around items-center">
                    <p className="font-semibold text-xl lg:text-2xl uppercase tracking-wide">Order Total: {amount?.toFixed(2)}</p>
                    <Link href={cancelUrl}>
                        <button className=" text-red-400 hover:underline text-sm uppercase">Cancel order</button>
                    </Link>
                </div>

            </div>

            <div className="space-y-2 px-4">
                <p className=" text-xl text-gray-700">Enter your mobile number</p>
                <div className="flex">
                    <span className=" border-2 bg-white py-[7px] px-2 font-semibold text-gray-700 rounded">+254</span>
                    <input className="shadow appearance-none border rounded w-full md:w-[50%] lg:w-[40%] 
                        py-2 px-3 text-gray-700 leading-tight focus:shadow-outline outline-indigo-700"
                        type="number"
                        placeholder="700000000"
                        onChange={handleInputChange}
                        ref={phone}
                    />
                </div>
            </div>

            <div className="px-4">
                <button className='bg-indigo-600 py-3 text-white
                    rounded-md font-semibold uppercase hover:bg-gray-500 w-1/2 md:w-[30%] disabled:bg-gray-500'
                    disabled={disable}
                >
                    PAY
                </button>
            </div>

            <div className=" bg-white p-6">
                <h3 className="font-semibold text-lg mb-6">How to pay with M-Pesa</h3>
                <ol className="space-y-2">
                    <li>1. Enter your mobile number</li>
                    <li>2. Receive a payment notification sent to your mobile phone</li>
                    <li>3. Enter your Mpesa pin and confirm payment</li>
                </ol>
            </div>



        </div>
    )
}

export default PaymentCheckout

export const getStaticProps: GetStaticProps<{
    categories: Category[]
    collections: Collection[]
}> = async () => {
    const categories = await getCategories()
    const collections = await getCollections()
    return {
        props: {
            categories,
            collections
        },
        revalidate: 10
    }
}