import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginBox from '../components/organisms/LoginBox'
import axios from 'axios'

const LoginPage = () => {
  // Accept setIsAuthenticated as a prop
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const loginUser = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/auth/login',
          {
            email: 'john.doe@mail.com',
            password: 'password123',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        console.log('Login Successful:', response.data)
      } catch (error) {
        console.error(
          'Login Failed:',
          error.response ? error.response.data : error.message
        )
      }
    }

    // Call the function
    loginUser()
  }, [])

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
