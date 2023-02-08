import Image from "next/image";
import React, { createRef, useState, useEffect } from "react";
import logo from "../public/mpesa.png"
import type { GetStaticProps } from "next"
import { Category, Collection } from '../typing'
import { getCategories, getCollections } from '../services'
import { useRouter } from 'next/router'


const PaymentCheckout = () => {
    const phone = createRef<HTMLInputElement>()
    const [disable, setDisable] = useState<boolean>(true)
    const [invoice, setInvoice] = useState()
    const [cancelUrl, setCancelUrl] = useState<string>('')
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
        if (typeof(publicToken) === 'string') {
            fetchInvoice(publicToken)
        }
    }, [publicToken])

    const fetchInvoice = async (token: string) => {
        try {
            const res = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session?publicToken=${token}`)
            if (res.ok) {
                const paymentSession = await res.json()
                setInvoice(paymentSession.invoice)
                setCancelUrl(paymentSession.PaymentAuthorizationRedirectUrl)
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

            <div className="space-y-2">
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