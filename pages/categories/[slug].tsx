import React from 'react'
import Head from 'next/head'
import type { GetStaticProps, GetStaticPaths, NextPage } from "next"
import { Category, Collection, Product } from '../../typing'
import { getCategories, getCollections, getProductsFromSlug } from '../../services'
import ProductCard from '../../components/ProductCard'
import { useRouter } from 'next/router'

const CategoryComponent: NextPage<{
    products: Product[]
}> = ({
    products
}) => {
        const router = useRouter()
        const { slug } = router.query
        return (
            <>
                <Head>
                    <title>{slug}</title>
                    <meta name="description" content={`a selection of different items to choose from the ${slug} category`} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-6'>
                    {
                        products.map((product, index) => <ProductCard key={index} product={product} />)
                    }
                </main>
            </>
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

    const products: Product[] = await getProductsFromSlug(slug)
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