import Image from 'next/image'
import React, { useState } from 'react'
import testImg from "../../public/test3.png"
import testImg2 from "../../public/test.png"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiOutlineDown } from "react-icons/ai"
import Comment from '../../components/Comment';
type Props = {}

const Product = (props: Props) => {
  const [show, setShow] = useState<boolean>(false)
  const [variant, setVariant] = useState<String>('')

  const reviewsHandler = () => {
    setShow(prev => !prev)
  }

  const variantHandler = (variant: String) => {
    setVariant(variant)
  }

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
    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-4  max-w-7xl mx-auto my-6'>
      <div>
        <Carousel
          swipeable={true}
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

        <div className='flex flex-col space-y-4 p-6'>
          <div className='space-y-1'>
            <h3 className='tracking-wide font-semibold text-lg lg:text-xl'>Variants</h3>
            <div className=' flex space-x-4'>

              {
                ["XS", "SMALL", "MEDIUM", "LARGE", "XL"].map((v, index) =>
                  <div
                    key={index}
                    className={variant === v ? "font-semibold bg-gray-300 border-gray-300 border-2 px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-300 hover:border-gray-300" :
                    "border-2 px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-300 hover:border-gray-300"}
                    onClick={() => variantHandler(v)}
                  >
                    {v}
                  </div>
                )
              }

            </div>
          </div>

        </div>

      </div>


      <div className='flex flex-col space-y-4 p-6 lg:p-4'>
        <div className='space-y-1'>
          <h3 className=' text-2xl md:text-3xl lg:text-4xl uppercase font-bold'>Yellow-shirt</h3>
          <p className='font-bold text-lg lg:text-xl'>KSH1200.00</p>
        </div>

        <p className='tracking-wide  md:text-lg'>You could fit in just about anything you need
          on the daily and go easy on your shoulders with the yellow-pellow from Moto designs.
        </p>

        <div className=' space-y-1'>
          <h3 className=' font-semibold text-lg lg:text-xl'>Quantity</h3>
          <div className=' relative'>
            <AiOutlineDown className='absolute right-[2%] lg:right-[72%] top-[30%] text-gray-500 -z-10' />
            <select className=" w-full lg:w-[30%] p-2.5 text-gray-500 bg-transparent border rounded-md shadow-sm outline-none appearance-none cursor-pointer">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>

        <button
          className=' w-[40%] lg:w-[30%] bg-indigo-600 py-3 text-white
          rounded-md font-semibold uppercase hover:bg-gray-500'
        >
          ADD TO CART
        </button>

        <div className='space-y-3 px-2'>
          <div className=' flex justify-between py-2 items-center cursor-pointer border-b-2 border-gray-500' onClick={reviewsHandler}>
            <h3 className='tracking-wide font-semibold text-lg'>Reviews</h3>
            <AiOutlineDown className={show ? 'text-gray-500 rotate-180' : 'text-gray-500'} />
          </div>

          <div className={show ? 'block' : 'hidden'}>
            {
              [1, 2, 3].map((index) => <Comment key={index} />)
            }
          </div>



        </div>

      </div>

    </div>
  )
}

export default Product