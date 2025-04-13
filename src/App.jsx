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
import SummaryPage from './pages/SummayPage'
import axios from 'axios'
import PrivateRoute from './routes/PrivateRoute'
import { useAuth } from './context/AuthContext'

function App() {
  const location = useLocation() // Get the current path
  const { logout } = useAuth()

  return (
    <div>
      {/* Conditionally render the Navbar */}
      {!['/login', '/register', '/nofound'].includes(location.pathname) && (
        <Navbar onLogout={logout} />
      )}

      <Routes>
        {/* Redirect to dashboard if logged in */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/'
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path='/nofound'
          element={
            <PrivateRoute>
              <NoFoundPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/transfer'
          element={
            <PrivateRoute>
              <TransferPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/top-up'
          element={
            <PrivateRoute>
              <TopUpPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/summary'
          element={
            <PrivateRoute>
              <SummaryPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/transaction-success'
          element={
            <PrivateRoute>
              <TransactionSuccessCard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
