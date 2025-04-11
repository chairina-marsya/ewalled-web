import React from 'react'
import LoginForm from '../molecules/LoginForm'
import LinkText from '../atoms/LinkText'
import { useTheme } from '../../context/ThemeContext'

const LoginBox = ({
  email,
  password,
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
      <LoginForm
        email={email}
        password={password}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
        error={error}
      />
      <p id='no-account' className='text-center mt-4 text-sm'>
        Don’t have an account?{' '}
        <LinkText
          linkId='register-link'
          text='Register here'
          href='/register'
        />
      </p>
    </div>
  )
}

export default LoginBox
