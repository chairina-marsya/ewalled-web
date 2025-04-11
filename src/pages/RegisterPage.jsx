import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginBox from '../components/organisms/LoginBox'
import RegisterBox from '../components/organisms/RegisterBox'
import { showAlert } from '../components/organisms/ShowAlert'

const RegisterPage = ({ setIsAuthenticated }) => {
  // Accept setIsAuthenticated as a prop
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(null)
  const [error, setError] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const registerUser = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/auth/register',
          {
            email: email,
            username: email,
            fullname: name,
            password: password,
            phoneNumber: phone,
            avatarUrl: avatarUrl,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        showAlert(
          `Congratulations! ${response.data.fullname} is successfully created. Please login back.`,
          'OK',
          handleConfirm
        )
        setError(null)
      } catch (error) {
        const inline = Object.values(error.response.data).join(', ')
        setError(inline || error.message)
      }
    }

    // Call the function
    registerUser()
  }

  const handleConfirm = () => {
    navigate('/login')
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left Section - Login Form */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-6 bg-white dark:bg-black dark:text-white'>
        <RegisterBox
          email={email}
          password={password}
          phone={phone}
          fullName={name}
          avatarUrl={avatarUrl}
          onAvatarUrl={(e) => setAvatarUrl(e.target.value)}
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
