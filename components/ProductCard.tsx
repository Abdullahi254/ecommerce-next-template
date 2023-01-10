import React from 'react'
import Image from 'next/image'
import test from "../public/test3.png"
import test2 from "../public/test.png"
import Link from 'next/link'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
type Props = {}

const ProductCard = (props: Props) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div className=" bg-gray-50 p-4 relative rounded-lg shadow-sm">

            <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["uperLargeDesktop", "desktop", "tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                <Image
                    src={test}
                    alt="Test image"
                    width={800}
                    height={800}
                    priority
                />
                <Image
                    src={test2}
                    alt="Test image"
                    width={800}
                    height={800}
                    priority
                />
            </Carousel>

            <Link href={`/products/kwikwi`}>
                <div className=' text-center mt-6 hover:text-indigo-600 cursor-pointer'>
                    <p className='font-semibold tracking-wide uppercase'>Polo Shirt</p>
                    <span className=' text-sm text-gray-400 font-bold tracking-wide'>KSH100.00</span>
                </div>
            </Link>

        </div>
    )
}

export default ProductCard
