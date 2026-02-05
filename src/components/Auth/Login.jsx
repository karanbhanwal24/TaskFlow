import React, { useState } from 'react'

const Login = ({ handleLogin }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        handleLogin(email, password)
        setEmail("")
        setPassword("")
    }

    return (
        <div className='flex h-screen w-screen items-center justify-center bg-transparent'>
            <div className='card rounded-xl p-12 w-[420px]'>
                <h2 className='text-2xl font-semibold mb-6'>Sign in</h2>
                <form
                    onSubmit={(e) => {
                        submitHandler(e)
                    }}
                    className='flex flex-col'
                >
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        required
                        className='outline-none bg-pink-50 border border-gray-200 font-medium text-base py-3 px-4 rounded-md placeholder:text-gray-400 mb-3' type="email" placeholder='Enter your email'
                    />
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required
                        className='outline-none bg-pink-50 border border-gray-200 font-medium text-base py-3 px-4 rounded-md mt-1 placeholder:text-gray-400 mb-6' type="password" placeholder='Enter password' />
                    <button className='mt-2 text-white border-none outline-none hover:opacity-95 font-semibold btn-primary text-base py-3 px-4 w-full rounded-md'>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login