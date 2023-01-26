import { NextPage } from 'next'
import React from 'react'
import { Category, Collection } from '../typing'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout: NextPage<{
    children: React.ReactNode
    categories:Category[]
    collections:Collection[]
}> = ({ children, categories, collections }) => {
    return (
        <>
            <Navbar categories={categories}/>
            {children}
            <Footer categories={categories} collections={collections}/>
        </>
    )
}

export default Layout