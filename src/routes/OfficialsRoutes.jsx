import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import CrimeList from '../officials/pages/crimelist/Crimelist'
import ShowMap from '../officials/pages/showmap/ShowMap'
import LandOff from '../officials/pages/landOff/landOff'
import ViewProfile from '../officials/pages/viewProfile/ViewProfile'

const OfficialsRoutes = () => {
  return (
    <div><Routes>
    <Route path='crimelist' element={<CrimeList />} />
    <Route path='showmap/:id' element={<ShowMap />} />
    <Route path='landoff' element={<LandOff />} />
    <Route path='profile' element={<ViewProfile />} />
    <Route path="/" element={<Navigate to="/officials/landoff" replace />} />
</Routes></div>
  )
}

export default OfficialsRoutes