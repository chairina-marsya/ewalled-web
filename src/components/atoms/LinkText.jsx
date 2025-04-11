import React from 'react'

const LinkText = ({ linkId, text, href, onClick }) => (
  <a
    id={linkId}
    href={href}
    className='text-blue-600 hover:underline'
    onClick={onClick}
  >
    {text}
  </a>
)

export default LinkText
