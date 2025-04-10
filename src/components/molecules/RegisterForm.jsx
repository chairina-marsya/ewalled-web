import React from 'react'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

const RegisterForm = ({
  email,
  password,
  phone,
  fullName,
  avatarUrl,
  onAvatarUrl,
  onNameChange,
  onPhoneChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
}) => (
  <form className='space-y-4' onSubmit={onSubmit}>
    {error && <p className='text-red-500 text-sm'>{error}</p>}
    <Input
      inputId='fullname-register'
      type='text'
      placeholder='Nama Lengkap'
      value={fullName}
      onChange={onNameChange}
    />
    <Input
      inputId='email-register'
      type='text'
      placeholder='Email'
      value={email}
      onChange={onEmailChange}
    />
    <Input
      inputId='password-register'
      type='password'
      placeholder='Password'
      value={password}
      onChange={onPasswordChange}
    />
    <Input
      inputId='phone-register'
      type='number'
      placeholder='No Hp'
      value={phone}
      onChange={onPhoneChange}
    />
    <Input
      inputId='avatar-register'
      type='text'
      placeholder='Avatar'
      value={avatarUrl}
      onChange={onAvatarUrl}
    />
    <Button idButton='register-button'>Daftar</Button>
  </form>
)

export default RegisterForm
