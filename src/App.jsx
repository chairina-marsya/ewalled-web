import { useState } from 'react'
import './App.css'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NoFoundPage from './pages/NotFoundPage'
import TransferPage from './pages/TransferPage'
import TopUpPage from './pages/TopUpPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/organisms/Navbar'
import TransactionSuccessCard from './pages/TransactionSuccessPage'

function App() {
  const location = useLocation() // Get the current path

  const handleLogout = () => {
    // Handle logout logic, e.g., clear localStorage or set state
    localStorage.clear()
    window.location.href = '/login' // Redirect to login page after logout
  }

  return (
    <div>
      {/* Conditionally render the Navbar */}
      {!['/login', '/register', '/nofound'].includes(location.pathname) && (
        <Navbar onLogout={handleLogout} />
      )}

      <Routes>
        {/* Redirect to dashboard if logged in */}
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/nofound' element={<NoFoundPage />} />
        <Route path='/transfer' element={<TransferPage />} />
        <Route path='/top-up' element={<TopUpPage />} />
        <Route
          path='/transaction-success'
          element={<TransactionSuccessCard />}
        />
      </Routes>
    </div>
  )
}

export default App
