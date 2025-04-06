import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import LinkText from '../atoms/LinkText'
import RegisterForm from '../molecules/RegisterForm'

const RegisterBox = ({
  email,
  password,
  phone,
  fullName,
  onNameChange,
  onPhoneChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
}) => {
  const { isDark } = useTheme()
  return (
    <div className='max-w-md w-full bg-white p-6 dark:bg-black dark:text-white'>
      <div className='flex justify-center mb-10'>
        <img
          src={isDark ? '/asset/walledwhite.svg' : '/asset/walled.svg'}
          alt='Logo'
          className='h-12'
        />
      </div>
      {/* <h2 className='text-center text-2xl font-semibold mb-4'>Walled</h2> */}
      <RegisterForm
        email={email}
        password={password}
        phone={phone}
        fullName={fullName}
        onNameChange={onNameChange}
        onPhoneChange={onPhoneChange}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
        error={error}
      />
      <p className='text-center mt-4 text-sm'>
        Sudah punya akun? <LinkText text='Login di sini' href='/login' />
      </p>
    </div>
  )
}

export default RegisterBox
