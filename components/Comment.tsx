import moment from 'moment'
import React from 'react'
import {Comment as CommentType } from '../typing'

type Props = {
    comment:CommentType
}

const Comment = ({comment}: Props) => {
    return (
        <div className="p-4 py-8 border-1 shadow-sm border-gray-300 bg-gray-50 rounded-md mb-4">
            <div className='px-4 mb-4'>
                <p className='inline-block text-sm uppercase font-semibold'>{comment.name}</p>
                <span className='text-sm ml-2'>{moment(comment.createdAt).format('DD MMM, YYYY')}</span>
            </div>
            <p className='px-4 text-sm tracking-wide text-left'>
                {comment.content}
            </p>
        </div>
    )
}

export default Comment