import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AcceptTask = ({ data, ownerId, taskIndex }) => {
    const [userData, setUserData] = useContext(AuthContext)

    const changeTaskStatus = (status) => {
        const updated = (userData || []).map(emp => {
            if (emp.id !== ownerId) return emp
            const old = emp.tasks[taskIndex]
            if (!old) return emp

            if ((status === 'completed' && old.completed) || (status === 'failed' && old.failed)) return emp

            const newTaskObj = {
                ...old,
                active: false,
                newTask: false,
                completed: status === 'completed',
                failed: status === 'failed'
            }

            const tasks = emp.tasks.map((t, i) => i === taskIndex ? newTaskObj : t)

            const counts = { ...(emp.taskCounts || {}) }
            if (old.newTask) counts.newTask = Math.max((counts.newTask || 0) - 1, 0)
            if (old.active) counts.active = Math.max((counts.active || 0) - 1, 0)
            if (old.completed) counts.completed = Math.max((counts.completed || 0) - 1, 0)
            if (old.failed) counts.failed = Math.max((counts.failed || 0) - 1, 0)

            if (newTaskObj.newTask) counts.newTask = (counts.newTask || 0) + 1
            if (newTaskObj.active) counts.active = (counts.active || 0) + 1
            if (newTaskObj.completed) counts.completed = (counts.completed || 0) + 1
            if (newTaskObj.failed) counts.failed = (counts.failed || 0) + 1

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

    const markCompleted = () => changeTaskStatus('completed')
    const markFailed = () => changeTaskStatus('failed')

    const completedDisabled = !!data.completed
    const failedDisabled = !!data.failed

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
            <div className='flex justify-between mt-6 '>
                <button onClick={markCompleted} disabled={completedDisabled || failedDisabled} className={`rounded font-medium py-2 px-3 text-sm ${completedDisabled || failedDisabled ? 'bg-gray-200 text-gray-600' : 'btn-primary'}`}>Mark as Completed</button>
                <button onClick={markFailed} disabled={failedDisabled || completedDisabled} className={`rounded font-medium py-2 px-3 text-sm ${failedDisabled || completedDisabled ? 'bg-gray-200 text-gray-600' : 'btn-danger'}`}>Mark as Failed</button>
            </div>
        </div>
    )
}
export default AcceptTask