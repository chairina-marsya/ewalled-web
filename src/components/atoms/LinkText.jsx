import React from 'react'

const LinkText = ({ linkId, text, href }) => (
  <a id={linkId} href={href} className='text-blue-600 hover:underline'>
    {text}
  </a>
)

export default LinkText
