import React from 'react'
import Navbar from './components/navbar/Navbar'
import OfficialsRoutes from '../routes/OfficialsRoutes'

const Officials = () => {
  return (
    <div><Navbar/>
    <OfficialsRoutes className="maincontent"/>
    </div>
    
  )
}

export default Officials