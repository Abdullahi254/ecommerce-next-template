
interface Img {
    url: string
}

interface Variant {
    name: string
}

export interface Product {
    id: string
    name: string
    slug: string
    description: string
    images: Img[]
    price: number
    variants: Variant[]

}

export interface Comment {
    headline: string
    name: string
    email: string
    content: string
    rating?: number
    createdAt: string
}

export interface Category {
    name: string
    slug: string
    description?: string
}

export interface Collection {
    name: string
    slug: string
    description?: string
}

export interface Address {
    city: string
    country: string
    name: string
    postalcode: String
    region?: string
    streetAndNumber: string
    surname?: string | null
}
export interface Item {
    amount: number
    discountAmount?: number
    hasSelectedPlan?: boolean
    name: string
    quantity: number
    rateOfTaxIncludedInPrice?: number
    type?: string
    unitPrice: number
}