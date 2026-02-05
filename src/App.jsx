import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, SetUserData] = useContext(AuthContext)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')

    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }

  }, [])

  // Listen for employee updates (dispatched by CreateTask) and refresh loggedInUserData if needed
  useEffect(() => {
    const handler = (event) => {
      // If event carries updated employee, use it directly for immediate update
      const updatedEmployee = event?.detail?.updatedEmployee
      if (updatedEmployee) {
        setLoggedInUserData(updatedEmployee)
        return
      }

      const loggedIn = JSON.parse(localStorage.getItem('loggedInUser') || 'null')
      if (loggedIn && loggedIn.role === 'employee') {
        // Make sure the latest employee data (from employees in localStorage) is used
        const employees = JSON.parse(localStorage.getItem('employees') || '[]')
        const updated = employees.find(emp => emp.firstName === loggedIn.data?.firstName)
        if (updated) setLoggedInUserData(updated)
      }
    }
    window.addEventListener('employeesUpdated', handler)
    return () => window.removeEventListener('employeesUpdated', handler)
  }, [])

  const handleLogin = (email, password) => {
    if (email == 'admin@me.com' && password == '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    } else if (userData) {
      const employee = userData.find((e) => email == e.email && e.password == password)
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))
      } else {
        alert("Invalid Credentials")
      }
    } else {
      alert("Invalid Credentials")
    }
  }



  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user == 'admin' ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null)}
    </>
  )
}

export default App