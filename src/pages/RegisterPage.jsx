import React, { useState } from 'react'
import RegisterBox from '../components/organisms/RegisterBox'
import { showAlert } from '../components/organisms/ShowAlert'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [tnc, setTnc] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!tnc) {
      setError(
        'To continue, please input all required fields and accept our Terms and Conditions.'
      )
      return
    }

    const result = await register(
      {
        email,
        fullname: name,
        password,
        phone,
        avatarUrl,
      },
      showAlert
    )

    if (!result.success) {
      setError(result.message)
    } else {
      setError(null)
    }
  }

  return (
    <div className='min-h-screen flex'>
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
          onSubmit={handleRegister}
          error={error}
          tnc={tnc}
          onCheckedTnc={(e) => setTnc(e.target.checked)}
        />
      </div>

      <div
        className='hidden md:block w-1/2 bg-cover bg-center'
        style={{ backgroundImage: "url('/asset/loginbg.png')" }}
      ></div>
    </div>
  )
}

export default RegisterPage
