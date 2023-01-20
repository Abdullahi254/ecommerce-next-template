import Image from 'next/image'
import React, { useState, createRef } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiOutlineDown } from "react-icons/ai"
import Comment from '../../components/Comment';
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import type { NextPage, GetStaticProps, GetStaticPaths } from "next"
import { Comment as CommentType, Product } from '../../typing';
import { getCommentsFromSlug, getProducts } from '../../services';
import { RootState } from '../../redux/app/store';


const Product: NextPage<{
  product: Product,
  comments:CommentType[]
}> = ({
  product,
  comments
}) => {
    const [show, setShow] = useState<boolean>(false)
    const [variant, setVariant] = useState<String>(product.variants[0].name)
    const [cartError, setCartError] = useState<boolean>(false)
    const quantityRef = createRef<HTMLSelectElement>()

    const cartState = useSelector((state:RootState)=>state)
    const dispatch = useDispatch()

    const reviewsHandler = () => {
      setShow(prev => !prev)
    }

    const variantHandler = (variant: String) => {
      setVariant(variant)
    }

    const handleAddToCart = () => {
      if (variant.length > 1 && quantityRef.current?.value) {
        const item = {
          id: product.id,
          slug: product.slug,
          name: product.name,
          variant: variant,
          price: product.price,
          quantity: parseInt(quantityRef.current.value),
          subTotal: product.price * parseInt(quantityRef.current.value),
          image:product.images[0].url
        }
        dispatch(addToCart(item))
        localStorage.setItem('cart', JSON.stringify(cartState));
      } else {
        setCartError(true)
        setTimeout(() => {
          setCartError(false)
        }, 3000)
      }
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
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-4  max-w-7xl mx-auto my-6 overflow-x-hidden'>
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
            {
              product.images.map((img, index) =>
                <Image
                key={index}
                  src={img.url.toString()}
                  alt={product.name}
                  width={800}
                  height={800}
                  priority
                />
              )
            }
          </Carousel>

          <div className='flex flex-col space-y-4 p-6'>
            <div className='space-y-1'>
              <h3 className='tracking-wide font-semibold text-lg lg:text-xl'>Variants</h3>
              <div className=' flex space-x-4'>

                {
                  product.variants.map((v, index) =>
                    <div
                      key={index}
                      className={variant === v.name ? "font-semibold bg-gray-300 border-gray-300 border-2 px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-300 hover:border-gray-300" :
                        "border-2 px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-300 hover:border-gray-300"}
                      onClick={() => variantHandler(v.name)}
                    >
                      {v.name}
                    </div>
                  )
                }

              </div>
            </div>

          </div>

        </div>


        <div className='flex flex-col space-y-4 p-6 lg:p-4'>
          <div className='space-y-1'>
            <h3 className=' text-2xl md:text-3xl lg:text-4xl uppercase font-bold'>{product.name}</h3>
            <p className='font-bold text-lg lg:text-xl'>KSH{product.price.toFixed(2)}</p>
          </div>

          <p className='tracking-wide  md:text-lg'>{product.description}</p>

          <div className=' space-y-1'>
            <h3 className=' font-semibold text-lg lg:text-xl'>Quantity</h3>
            <div className=' relative'>
              <AiOutlineDown className='absolute right-[2%] lg:right-[72%] top-[30%] text-gray-500 -z-10' />
              <select className=" w-full lg:w-[30%] p-2.5 text-gray-500 bg-transparent border rounded-md shadow-sm outline-none appearance-none cursor-pointer" ref={quantityRef}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>

          <div className='py-2 inline-block space-x-2 relative'>
            <button
              className=' w-[40%] lg:w-[30%] bg-indigo-600 py-3 text-white
          rounded-md font-semibold uppercase hover:bg-gray-500'
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>

            <span
              className={cartError ? ' text-red-500 font-semibold text-sm absolute top-[30%] transition ease-in-out delay-300 translate-x-2 duration-300'
                : 'translate-x-[1000px] absolute invisible'}>
              please choose a variant
            </span>

          </div>

          <div className='space-y-3 px-2'>
            <div className=' flex justify-between py-2 items-center cursor-pointer border-b-2 border-gray-500' onClick={reviewsHandler}>
              <h3 className='tracking-wide font-semibold text-lg'>Reviews</h3>
              <AiOutlineDown className={show ? 'text-gray-500 rotate-180' : 'text-gray-500'} />
            </div>

            <div className={show ? 'block' : 'hidden'}>
              {
                comments.map((comment,index) => <Comment key={index} comment={comment} />)
              }
            </div>



          </div>

        </div>

      </div>
    )
  }

export default Product

export const getStaticPaths: GetStaticPaths = async () => {
  const products: Product[] = await getProducts()
  const paths = products.map(product => {
    return (
      {
        params: {
          slug: product.slug
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
  product: Product,
  comments:CommentType[]
}> = async (context) => {
  const products: Product[] = await getProducts()
  const slugList = products.map(product => product.slug)
  const slug = slugList.find(val => val === context?.params?.slug)
  if (typeof (slug) === "undefined") {
    return {
      notFound: true
    }
  }
  const comments:CommentType[] = await getCommentsFromSlug(slug)
  const product = products.find(product => product.slug === slug) as Product
  return {
    props: {
      product,
      comments
    },
    revalidate: 10
  }


}
