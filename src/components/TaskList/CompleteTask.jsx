import React from 'react'

const CompleteTask = ({ data }) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 card rounded-md'>
            <div className='flex justify-between items-center'>
                <span className='badge-muted'>{data.category}</span>
                <h4 className='text-sm text-gray-500'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-lg font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 text-gray-600'>
                {data.taskDescription}
            </p>
            <div className='mt-6'>
                <button className='w-full rounded font-medium py-2 px-2 text-sm bg-green-200 text-gray-600' disabled>Completed</button>
            </div>
        </div>
    )
}

export default CompleteTask