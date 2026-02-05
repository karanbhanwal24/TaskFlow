import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'

const Header = (props) => {

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    props.changeUser('')
  }

  const username = props.data?.firstName || (JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.role === 'admin' ? 'Admin' : (props.user || ''))

  return (
    <div className='flex items-center justify-between card p-4 rounded-md'>
      <div>
        <div className='text-sm text-gray-500'>Welcome back</div>
        <div className='text-xl font-semibold mt-1'>{username}</div>
      </div>
      <div className='flex items-center gap-3'>
        <button onClick={logOutUser} className='px-4 py-2 rounded-md border border-red-200 text-sm text-gray-600 hover:bg-gray-100'>Log Out</button>
        <UserCircleIcon className='w-8 h-8 text-gray-400' />
      </div>
    </div>
  )
}

export default Header