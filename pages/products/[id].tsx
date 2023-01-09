import Image from 'next/image'
import React from 'react'
import testImg from "../../public/test3.png"
import testImg2 from "../../public/test.png"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
type Props = {}

const Product = (props: Props) => {
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
        <div className=' grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto my-6'>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                <Image
                    src={testImg}
                    alt="Test image"
                    width={800}
                    height={800}
                    priority
                />
                <Image
                    src={testImg2}
                    alt="Test image"
                    width={800}
                    height={800}
                    priority
                />
            </Carousel>

            <div>
                
            </div>

        </div>
    )
}

export default Product