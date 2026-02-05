import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {

    const [userData, setUserData] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')


    const submitHandler = (e) => {
        e.preventDefault()

        const task = { taskTitle, taskDescription, taskDate, category, active: false, newTask: true, failed: false, completed: false }

        const updated = userData.map(emp => {
            if (asignTo === emp.firstName) {
                return {
                    ...emp,
                    tasks: [...(emp.tasks || []), task],
                    taskCounts: { ...(emp.taskCounts || {}), newTask: ((emp.taskCounts && emp.taskCounts.newTask) || 0) + 1 }
                }
            }
            return emp
        })

        setUserData(updated)
        localStorage.setItem('employees', JSON.stringify(updated))

        const loggedIn = JSON.parse(localStorage.getItem('loggedInUser') || 'null')
        const updatedEmp = updated.find(emp => emp.firstName === asignTo)
        if (loggedIn && loggedIn.role === 'employee' && loggedIn.data?.firstName === asignTo) {
            localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: updatedEmp }))
        }

        window.dispatchEvent(new CustomEvent('employeesUpdated', { detail: { updatedEmployee: updatedEmp } }))

        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')

    }

    return (
        <div className='card p-6 mt-6 rounded-md'>
            <form onSubmit={(e) => {
                submitHandler(e)
            }}
                className='flex flex-wrap w-full items-start justify-between gap-6'
            >
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-500 mb-1'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value)
                            }}
                            className='text-sm py-2 px-3 w-4/5 rounded-md outline-none bg-gray-50 border border-gray-200 mb-4' type="text" placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-500 mb-1'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => {
                                setTaskDate(e.target.value)
                            }}
                            className='text-sm py-2 px-3 w-4/5 rounded-md outline-none bg-gray-50 border border-gray-200 mb-4' type="date" />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-500 mb-1'>Assign to</h3>
                        <input
                            value={asignTo}
                            onChange={(e) => {
                                setAsignTo(e.target.value)
                            }}
                            className='text-sm py-2 px-3 w-4/5 rounded-md outline-none bg-gray-50 border border-gray-200 mb-4' type="text" placeholder='employee name' />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-500 mb-1'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                            className='text-sm py-2 px-3 w-4/5 rounded-md outline-none bg-gray-50 border border-gray-200 mb-4' type="text" placeholder='design, dev, etc' />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-500 mb-1'>Description</h3>
                    <textarea value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value)
                        }} className='w-full h-44 text-sm py-3 px-4 rounded-md outline-none bg-gray-50 border border-gray-200' name="" id=""></textarea>
                    <button className='btn-primary py-3 hover:opacity-95 px-5 rounded text-sm mt-4 w-full'>Create Task</button>
                </div>

            </form>
        </div>
    )
}

export default CreateTask