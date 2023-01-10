import React from 'react'

type Props = {}

const Comment = (props: Props) => {
    return (
        <div className="p-4 py-8 border-1 shadow-sm border-gray-300 bg-gray-50 rounded-md mb-4">
            <div className='px-4 mb-4'>
                <p className='inline-block text-sm uppercase font-semibold'>ALEX MAKELE</p>
                <span className='text-sm ml-2'>10 Jan, 2023</span>
            </div>
            <p className='px-4 text-sm tracking-wide text-left'>
                Looks great, feels great👍
            </p>
        </div>
    )
}

export default Comment