import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Homepage from '../Pages/Homepage'
import Admin from '../Pages/Admin'
// import Task from '../Pages/Task'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/"element={<Login/>} />
      <Route path="/register" element={<Signup/>} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/admin" element={<Admin />} />
      {/* <Route path="/task" element={<Task />} /> */}
      
    </Routes>
  )
}

export default AllRoutes