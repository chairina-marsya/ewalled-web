import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginBox from '../components/organisms/LoginBox'

const LoginPage = () => {
  // Accept setIsAuthenticated as a prop
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (email === 'admin' && password === 'admin') {
      navigate('/') // Redirect to homepage (Dashboard) after successful login
    } else {
      setError('Username atau password salah') // Show error if login fails
    }
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left Section - Login Form */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-6 bg-white'>
        <LoginBox
          email={email}
          password={password}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleLogin}
          error={error}
        />
      </div>

      {/* Right Section - Image */}
      <div
        className='hidden md:block w-1/2 bg-cover bg-center'
        style={{ backgroundImage: "url('/asset/loginbg.png')" }}
      ></div>
    </div>
  )
}

export default LoginPage
