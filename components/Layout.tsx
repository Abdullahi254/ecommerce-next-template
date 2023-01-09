import { NextPage } from 'next'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout: NextPage<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout