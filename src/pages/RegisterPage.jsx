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
  const [tnc, setTnc] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    if (!tnc) {
      setError(
        'To continue, please input all required fileds and accept our Terms and Conditions.'
      )
    } else {
      const registerUser = async () => {
        try {
          const response = await axios.post(
            'https://kel-1-rakamin-walled-server.onrender.com/api/auth/register',
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
            `Congratulations! ${response.data.message}.`,
            'OK',
            handleConfirm
          )
          setError(null)
        } catch (error) {
          const inline = error.response.data.message
          setError(inline)
        }
      }

      // Call the function
      registerUser()
    }
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
          tnc={tnc}
          onCheckedTnc={(e) => setTnc(e.target.checked)}
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
