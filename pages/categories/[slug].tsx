import React from 'react'
import type { GetStaticProps, GetStaticPaths } from "next"
import { Category, Collection, Product } from '../../typing'
import { getCategories, getCollections, getProductsFromSlug } from '../../services'

type Props = {}

const CategoryComponent = (props: Props) => {
    return (
        <div>

        </div>
    )
}

export default CategoryComponent

export const getStaticPaths: GetStaticPaths = async () => {
    const categories: Category[] = await getCategories()
    const paths = categories.map(category => {
        return (
            {
                params: {
                    slug: category.slug
                }
            }
        )
    })
    return {
        paths,
        fallback: 'blocking'
    }
}


export const getStaticProps: GetStaticProps<{
    products: Product[]
    categories: Category[]
    collections: Collection[]
}> = async (context) => {
    const categories = await getCategories()
    const slugList = categories.map(category => category.slug)
    const slug = slugList.find(val => val === context?.params?.slug)
    if (typeof (slug) === "undefined") {
        return {
            notFound: true
        }
    }

    const products:Product[] = await getProductsFromSlug(slug)
    const collections = await getCollections()
    return {
        props: {
            products,
            categories,
            collections
        },
        revalidate: 10
    }
}