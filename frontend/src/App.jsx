import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedLayout from './layouts/ProtectedLayout'
import { useAuth } from './context/AuthContext'

function App() {
  const { token } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/register" element={!token ? <Register /> : <Navigate to="/" replace />} />
      <Route path="/" element={<ProtectedLayout>{<Dashboard />}</ProtectedLayout>} />
    </Routes>
  )
}

export default App
