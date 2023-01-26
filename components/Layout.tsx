import { NextPage } from 'next'
import React from 'react'
import { Category } from '../typing'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout: NextPage<{
    children: React.ReactNode
    categories:Category[]
}> = ({ children, categories }) => {
    return (
        <>
            <Navbar categories={categories}/>
            {children}
            <Footer categories={categories}/>
        </>
    )
}

export default Layout