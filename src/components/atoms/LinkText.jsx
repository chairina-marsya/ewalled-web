import React from 'react'

const LinkText = ({ text, href }) => (
  <a href={href} className='text-blue-600 hover:underline'>
    {text}
  </a>
)

export default LinkText
