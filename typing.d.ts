
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