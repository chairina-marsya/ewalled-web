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
      type='text'
      placeholder='Nama Lengkap'
      value={fullName}
      onChange={onNameChange}
    />
    <Input
      type='text'
      placeholder='Email'
      value={email}
      onChange={onEmailChange}
    />
    <Input
      type='password'
      placeholder='Password'
      value={password}
      onChange={onPasswordChange}
    />
    <Input
      type='number'
      placeholder='No Hp'
      value={phone}
      onChange={onPhoneChange}
    />
    <Input
      type='text'
      placeholder='Avatar'
      value={avatarUrl}
      onChange={onAvatarUrl}
    />
    <Button>Daftar</Button>
  </form>
)

export default RegisterForm
