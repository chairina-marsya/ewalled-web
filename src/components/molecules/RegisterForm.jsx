import React from 'react'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import LinkText from '../atoms/LinkText'
import { showTnc } from '../organisms/ShowTnc'

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
  tnc,
  onCheckedTnc,
}) => (
  <form className='space-y-4' onSubmit={onSubmit}>
    {error && <p className='text-red-500 text-sm'>{error}</p>}
    <Input
      inputId='fullname-register'
      type='text'
      placeholder='Full Name'
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
      placeholder='Avatar (optional)'
      value={avatarUrl}
      onChange={onAvatarUrl}
    />
    <label className='flex items-center space-x-3'>
      <input type='checkbox' checked={tnc} onChange={onCheckedTnc} />
      <span className='text-sm text-gray-700'>
        <p id='tnc-account' className='text-left text-sm'>
          I have read and agree to the{' '}
          <LinkText
            linkId='tnc-link'
            text='Terms and Conditions'
            onClick={() => showTnc()}
          />
          <span id='mandatory' className='text-red-600'>
            {' '}
            *
          </span>
        </p>
      </span>
    </label>
    <Button idButton='register-button'>Register</Button>
  </form>
)

export default RegisterForm
