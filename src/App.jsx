import { useState } from 'react'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import NoFoundPage from './pages/NotFound'
import TransferPage from './pages/Transfer'
import TopUpPage from './pages/TopUp'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div>
      {/* Navbar hanya muncul jika user sudah login */}
      {isAuthenticated && (
        <nav className='nav'>
          <img height='25' src='/asset/walled.png' alt='Logo' />
          <div className='nav-links'>
            <a href='/' className='nav-link'>
              Dashboard
            </a>
            <a href='/transfer' className='nav-link'>
              Transfer
            </a>
            <a href='/top-up' className='nav-link'>
              Top Up
            </a>
            <a
              href='/login'
              className='nav-link'
              onClick={() => setIsAuthenticated(false)}
            >
              Sign Out
            </a>
            <img height='20' src='/asset/mode.png' alt='Mode Icon' />
          </div>
        </nav>
      )}

      <Routes>
        {/* Redirect ke dashboard jika sudah login */}
        <Route
          path='/'
          element={isAuthenticated ? <HomePage /> : <Navigate to='/login' />}
        />
        <Route
          path='/login'
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path='/transfer'
          element={
            isAuthenticated ? <TransferPage /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/top-up'
          element={isAuthenticated ? <TopUpPage /> : <Navigate to='/login' />}
        />
        <Route path='*' element={<NoFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
