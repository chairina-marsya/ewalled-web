import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginBox from '../components/organisms/LoginBox'
import { showAlert } from '../components/organisms/ShowAlert'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('token', token)
    if (token) {
      navigate('/') // Redirect to dashboard if token is valid
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const result = await login(email, password, showAlert)

    if (!result.success) {
      setError(result.message)
    }
  }

  return (
    <div className='min-h-screen flex'>
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

      <div
        className='hidden md:block w-1/2 bg-cover bg-center'
        style={{ backgroundImage: "url('/asset/loginbg.png')" }}
      ></div>
    </div>
  )
}

export default LoginPage
