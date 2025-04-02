import React from 'react'

const Input = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className='w-full p-3 rounded-md bg-[#FAFBFD] border-none'
  />
)

export default Input
