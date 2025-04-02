import React from 'react'

const Navbar = ({ onLogout }) => {
  return (
    <nav className='nav'>
      <img height='25' src='/asset/walled.png' alt='Logo' />
      <div className='nav-links'>
        <a href='/' className='nav-link'>
          Dashboard
        </a>
        <a href='/transfer' className='nav-link'>
          Transfer
        </a>
        <a href='/top-up' className='nav-link'>
          Top Up
        </a>
        <a href='/login' className='nav-link' onClick={onLogout}>
          Sign Out
        </a>
        <img height='20' src='/asset/mode.png' alt='Mode Icon' />
      </div>
    </nav>
  )
}

export default Navbar
