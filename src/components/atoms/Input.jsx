import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react' // Optional: using Lucide icons

const Input = ({ inputId, type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className='relative w-full'>
      <input
        id={inputId}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='w-full p-3 pr-10 rounded-md bg-[#FAFBFD] border-none dark:bg-[#272727] dark:text-white'
      />
      {isPassword && (
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  )
}

export default Input
