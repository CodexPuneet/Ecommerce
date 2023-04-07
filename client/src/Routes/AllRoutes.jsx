import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Homepage from '../Pages/Homepage'
import Admin from '../Pages/Admin'
import Cart from '../Pages/Cart'
import Payment from '../Pages/Payment'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/"element={<Login/>} />
      <Route path="/register" element={<Signup/>} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />   
    </Routes>
  )
}

export default AllRoutes