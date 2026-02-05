import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {

    const [userData, setUserData] = useContext(AuthContext)


    return (
        <div className='card p-5 rounded-md mt-5'>
            <div className='flex text-sm text-gray-500 pb-3 border-b mb-3'>
                <h2 className='font-medium w-1/5'>Employee</h2>
                <h3 className='font-medium w-1/5'>New</h3>
                <h5 className='font-medium w-1/5'>Accepted</h5>
                <h5 className='font-medium w-1/5'>Completed</h5>
                <h5 className='font-medium w-1/5'>Failed</h5>
            </div>
            <div>
                {userData.map(function (elem, idx) {
                    return <div key={idx} className='flex items-center justify-between py-3 border-b last:border-none'>
                        <h2 className='font-medium w-1/5'>{elem.firstName}</h2>
                        <h3 className='w-1/5'><span className='badge-primary'>{elem.taskCounts.newTask}</span></h3>
                        <h5 className='w-1/5 text-gray-600'>{elem.taskCounts.active}</h5>
                        <h5 className='w-1/5'><span className='badge-success'>{elem.taskCounts.completed}</span></h5>
                        <h5 className='w-1/5'><span className='badge-danger'>{elem.taskCounts.failed}</span></h5>
                    </div>
                })}
            </div>

        </div>
    )
}

export default AllTask