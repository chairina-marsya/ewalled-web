import React from 'react'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

const LoginForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
}) => (
  <form className='space-y-4' onSubmit={onSubmit}>
    {error && <p className='text-red-500 text-sm'>{error}</p>}
    <Input
      inputId='username-login'
      type='text'
      placeholder='Email'
      value={email}
      onChange={onEmailChange}
    />
    <Input
      inputId='password-login'
      type='password'
      placeholder='Password'
      value={password}
      onChange={onPasswordChange}
    />
    <Button idButton='login-button'>Login</Button>
  </form>
)

export default LoginForm
