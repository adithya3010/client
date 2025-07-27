import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import User from './components/User'
import HR from './components/HR'
import Admin from './components/Admin'
import Doctor from './components/Doctor'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/user" element={<User />} />
        <Route path="/hr" element={<HR />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </>
  )
}

export default App