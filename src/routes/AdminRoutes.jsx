import React from 'react'
import Category from '../admin/pages/category/Category'
import Home from '../admin/pages/home/Home'
import { Route, Routes, Navigate } from 'react-router-dom'
import User from '../admin/pages/users/Users'
import NewOfficials from '../admin/pages/newOfficials/NewOfficials'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='users' element={<User/>} />
      <Route path='category' element={<Category/>} />
      
      <Route path='home' element={<Home/>} />
      <Route path='newoff' element={<NewOfficials/>} />
      <Route path="/" element={<Navigate to="/admin/home" replace />} />
    </Routes>
  )
}

export default AdminRoutes
