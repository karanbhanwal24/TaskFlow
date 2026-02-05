import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const NewTask = ({ data, ownerId, taskIndex }) => {
    const [userData, setUserData] = useContext(AuthContext)

    const acceptTask = () => {
        const updated = (userData || []).map(emp => {
            if (emp.id !== ownerId) return emp
            const old = emp.tasks[taskIndex]
            if (!old) return emp
            // If already accepted, do nothing
            if (old.active) return emp

            const newTaskObj = { ...old, newTask: false, active: true }
            const tasks = emp.tasks.map((t, i) => i === taskIndex ? newTaskObj : t)
            const counts = { ...(emp.taskCounts || {}) }

            // decrement previous state counts
            if (old.newTask) counts.newTask = Math.max((counts.newTask || 0) - 1, 0)
            if (old.active) counts.active = Math.max((counts.active || 0) - 1, 0)
            if (old.completed) counts.completed = Math.max((counts.completed || 0) - 1, 0)
            if (old.failed) counts.failed = Math.max((counts.failed || 0) - 1, 0)

            // increment accepted
            counts.active = (counts.active || 0) + 1

            return { ...emp, tasks, taskCounts: counts }
        })

        setUserData(updated)
        localStorage.setItem('employees', JSON.stringify(updated))
        const updatedEmp = updated.find(emp => emp.id === ownerId)
        const loggedIn = JSON.parse(localStorage.getItem('loggedInUser') || 'null')
        if (loggedIn && loggedIn.role === 'employee' && loggedIn.data?.id === ownerId) {
            localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: updatedEmp }))
        }
        window.dispatchEvent(new CustomEvent('employeesUpdated', { detail: { updatedEmployee: updatedEmp } }))
    }

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
                <button onClick={acceptTask} className='rounded font-medium py-2 px-3 text-sm btn-primary hover:opacity-95'>Accept Task</button>
            </div>
        </div>
    )
}

export default NewTask