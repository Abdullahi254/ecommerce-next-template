import Image from "next/image";
import React, { createRef, useState, useEffect } from "react";
import logo from "../public/mpesa.png"
import type { GetStaticProps } from "next"
import { Address, Category, Collection, Item } from '../typing'
import { getCategories, getCollections } from '../services'
import { useRouter } from 'next/router'
import Link from "next/link";
import { TbFidgetSpinner } from "react-icons/tb"
import { CgSpinner } from "react-icons/cg"
import { separator } from "../utils/utils"


const PaymentCheckout = () => {
    const phone = createRef<HTMLInputElement>()
    const [disable, setDisable] = useState<boolean>(true)
    const [items, setItems] = useState<Item[]>()
    const [address, setAddress] = useState<Address>()
    const [cancelUrl, setCancelUrl] = useState<string>()
    const [amount, setAmount] = useState<number>(0)
    const [paymentId, setPaymentId] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true)
    const [errorAlert, setError] = useState<boolean>(false)
    const [paymentLoad, setPaymentLoad] = useState<boolean>(false)
    const [paymentError, setPaymentError] = useState<boolean>(false)
    const handleInputChange = () => {
        if (phone.current?.value.length !== 9) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }
    const router = useRouter()
    const handlePay = async () => {
        if (phone.current?.value && typeof (paymentId) === "string") {
            try {
                setPaymentLoad(true)
                const formData = new URLSearchParams();
                formData.append("phone", `254${phone.current.value}`)
                formData.append("amount", amount.toString())
                const resp = await fetch("/api/lipa", {
                    method: "POST",
                    body: formData.toString(),
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },
                })
                setTimeout(async () => {
                    const textRes = await resp.text()
                    const response = await fetch(`/api/query?id=${paymentId}&checkoutRequestId=${JSON.parse(textRes).CheckoutRequestID}`, {
                        method: "POST"
                    })
                    if (response.ok) {
                        //redirect
                        const textResponse = await response.text()
                        const returnUrl = JSON.parse(textResponse).returnUrl
                        console.log(returnUrl)
                        router.push(returnUrl)
                    } else {
                        throw new Error("something went wrong")
                    }
                }, 25000)
            } catch (er) {
                setPaymentLoad(false)
                setPaymentError(true)
            }
        }

    }
    const { query, isReady } = useRouter()
    const { publicToken } = query

    useEffect(() => {
        const fetchInvoice = async () => {
            if (isReady) {
                try {
                    const res = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session?publicToken=${publicToken}`)
                    const paymentSession = await res.json()
                    setItems(paymentSession.invoice.items as Item[])
                    setAddress(paymentSession.invoice.shippingAddress as Address)
                    setAmount(paymentSession.invoice.amount as number)
                    setCancelUrl(paymentSession.PaymentAuthorizationRedirectUrl as string)
                    setPaymentId(paymentSession.id as string)
                    setLoading(false)
                }
                catch (err) {
                    setLoading(false)
                    setError(true)
                    console.log("error fetching")
                }
            }
        }
        fetchInvoice()
    }, [publicToken, isReady])


    return (
        <div className="max-w-6xl mx-auto bg-gray-50 rounded-sm md:p-6 shadow-md flex flex-col space-y-4">

            <div className="flex justify-center">
                <Image src={logo} alt="mpesa icon" width={120} height={120} priority className="w-auto h-auto" />
            </div>
            {
                errorAlert &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center w-[90%] mx-auto" role="alert">
                    <strong className="font-bold mr-2">Error!</strong>
                    <span className="block sm:inline">Could not fetch order details.</span>
                </div>
            }
            {
                loading ? <div className="flex justify-center py-4"><TbFidgetSpinner className="text-indigo-600 text-5xl animate-spin" /> </div> :
                    <div className="bg-white p-4 space-y-3">
                        <h1 className="font-semibold text-xl lg:text-2xl text-center uppercase">Order Confirmation</h1>

                        <div className="py-2 border-t-2  border-gray-400 pl-4">
                            <h3 className="text-lg font-semibold">Order Details:</h3>
                        </div>

                        <div className="py-4 border-t-2  border-gray-400 relative overflow-x-auto ">
                            <table className="w-full table-auto text-sm text-left text-gray-500">
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
                                                KSH{separator(item.unitPrice) + ".00"}
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
                                <p className="text-sm tracking-wide"><span className="font-semibold mr-2">Postal-Code:</span>{address?.postalCode}</p>
                            </div>
                        </div>

                        <div className="p-4 border-t-2  border-gray-400 space-y-3 flex flex-col md:flex-row md:justify-around md:items-center">
                            <p className="font-semibold text-lg md:text-xl lg:text-2xl uppercase tracking-wide text-indigo-600">Order Total: KSH{separator(amount) + ".00"}</p>
                            <Link href={cancelUrl || "/"}>
                                <button className=" text-red-400 hover:underline text-sm uppercase">Cancel order</button>
                            </Link>
                        </div>

                    </div>
            }

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

            <div className="px-4 flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 items-center">
                <button className='bg-indigo-600 py-3 text-white
                    rounded-md font-semibold uppercase hover:bg-gray-500 w-1/2 md:w-[30%] disabled:bg-gray-500 relative'
                    disabled={disable || errorAlert || paymentLoad || paymentError}
                    onClick={handlePay}
                >
                    {paymentLoad && <CgSpinner className=" animate-spin text-3xl md:text-4xl absolute left-2 top-3 md:top-2" />}
                    PAY
                </button>
                {paymentError && <div className="text-red-500 px-4 py-3 rounded relative text-center" role="alert">
                    <strong className="font-bold mr-2">Error!</strong>
                    <span className="block sm:inline">Something went wrong contact help or <strong onClick={() => setPaymentError(false)} className="text-indigo-600 underline text-sm cursor-pointer">Try again</strong></span>
                </div>}
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