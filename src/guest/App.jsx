import React from 'react'
import GuestRoutes from '../routes/GuestRoutes'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const GuestHome = () => {
  return (
    <div >
      <Navbar/>
      <GuestRoutes/>

      
    </div>
  )
}

export default GuestHome