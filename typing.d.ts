
interface Img{
    url:string
}

interface Variant{
    name:string
}

export interface Product {
    id:string
    name:string
    slug:string
    description:string
    images:Img[]
    price:number
    variants:Variant[]

}

export interface Comment {
    headline:string
    name:string
    email:string
    content:string
    rating?:number
    createdAt:string
}

export interface Category {
    name:string
    slug:string
    description?:string
}