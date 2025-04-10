import React from 'react'

const Button = ({ idButton, children, onClick }) => (
  <button
    id={idButton}
    onClick={onClick}
    className='w-full p-3 bg-[#0061FF] text-white shadow-[0px_0px_10px_0px_#19918F] hover:bg-[#004BB5] rounded-md'
  >
    {children}
  </button>
)
export default Button
