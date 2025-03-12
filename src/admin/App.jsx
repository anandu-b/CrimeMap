import React from 'react'
import AdminRoutes from '../routes/AdminRoutes'
import { DarkModeContextProvider } from './context/darkModeContext'

const Admin = () => {
  return (
    <div>
      <DarkModeContextProvider>

        <AdminRoutes />
      </DarkModeContextProvider>

    </div>
  )
}

export default Admin