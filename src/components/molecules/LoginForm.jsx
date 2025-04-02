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
      type='text'
      placeholder='Username'
      value={email}
      onChange={onEmailChange}
    />
    <Input
      type='password'
      placeholder='Password'
      value={password}
      onChange={onPasswordChange}
    />
    <Button>Login</Button>
  </form>
)

export default LoginForm
