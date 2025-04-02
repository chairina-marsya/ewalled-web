import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginBox from '../components/organisms/LoginBox'
import RegisterBox from '../components/organisms/RegisterBox'

const RegisterPage = ({ setIsAuthenticated }) => {
  // Accept setIsAuthenticated as a prop
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (email === 'admin' && password === 'admin') {
      setIsAuthenticated(true) // Set the authentication state to true
      navigate('/') // Redirect to homepage (Dashboard) after successful login
    } else {
      setError('Username atau password salah') // Show error if login fails
    }
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left Section - Login Form */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-6 bg-white'>
        <RegisterBox
          email={email}
          password={password}
          phone={phone}
          fullName={name}
          onNameChange={(e) => setName(e.target.value)}
          onPhoneChange={(e) => setPhone(e.target.value)}
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

export default RegisterPage
