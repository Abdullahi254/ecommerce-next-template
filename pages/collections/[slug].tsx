import React from 'react'
import Head from 'next/head'
import type { GetStaticProps, GetStaticPaths, NextPage } from "next"
import { Category, Collection, Product } from '../../typing'
import { getCategories, getCollections, getProductsFromCollectionSlug } from '../../services'
import ProductCard from '../../components/ProductCard'
import { useRouter } from 'next/router'

const CollectionComponent: NextPage<{
    products: Product[]
}> = ({
    products
}) => {
    const router = useRouter()
    const {slug} = router.query
        return (
            <>
                <Head>
                    <title>{slug}</title>
                    <meta name="description" content={`a selection of different items to choose from the ${slug} collection`} />
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

export default CollectionComponent

export const getStaticPaths: GetStaticPaths = async () => {
    const collections: Collection[] = await getCollections()
    const paths = collections.map(collection => {
        return (
            {
                params: {
                    slug: collection.slug
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
    const collections = await getCollections()
    const slugList = collections.map(collection => collection.slug)
    const slug = slugList.find(val => val === context?.params?.slug)
    if (typeof (slug) === "undefined") {
        return {
            notFound: true
        }
    }

    const products: Product[] = await getProductsFromCollectionSlug(slug)
    const categories = await getCategories()
    return {
        props: {
            products,
            categories,
            collections
        },
        revalidate: 10
    }
}