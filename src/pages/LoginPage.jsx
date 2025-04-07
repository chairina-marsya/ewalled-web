import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginBox from '../components/organisms/LoginBox'
import axios from 'axios'
import { showAlert } from '../components/organisms/ShowAlert'

const LoginPage = () => {
  // Accept setIsAuthenticated as a prop
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const loginUser = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/auth/login',
          {
            email: email,
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        localStorage.setItem('token', response.data.token)
        showAlert(`Selamat datang ${email}!`, 'OK', handleConfirm)
        setError(null)
      } catch (error) {
        setError(error.message)
      }
    }

    // Call the function
    loginUser()
  }

  const handleConfirm = () => {
    navigate('/')
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left Section - Login Form */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-6 bg-white dark:bg-black dark:text-white'>
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
