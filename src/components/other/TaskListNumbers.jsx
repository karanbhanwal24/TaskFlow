import React from 'react'

const StatCard = ({ title, value }) => (
    <div className='card p-5 rounded-md w-[23%] flex flex-col'>
        <div className='text-sm text-gray-500'>{title}</div>
        <div className='text-2xl font-bold mt-2'>{value}</div>
    </div>
)

const TaskListNumbers = ({ data }) => {
    return (
        <div className='flex mt-8 justify-between gap-5'>
            <StatCard title='New' value={data.taskCounts.newTask} />
            <StatCard title='Completed' value={data.taskCounts.completed} />
            <StatCard title='Accepted' value={data.taskCounts.active} />
            <StatCard title='Failed' value={data.taskCounts.failed} />
        </div>
    )
}

export default TaskListNumbers