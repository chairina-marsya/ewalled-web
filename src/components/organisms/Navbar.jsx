import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className='sticky top-0 z-50 bg-white px-6 py-3 h-[8vh] flex justify-between items-center shadow-sm'>
      {/* Mobile: Avatar + Name */}
      <div className='flex items-center gap-3 lg:hidden'>
        <img
          src='https://images.unsplash.com/photo-1574169207511-e21a21c8075a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Profile'
          className='w-10 h-10 rounded-full object-cover'
        />
        <div className='flex flex-col'>
          <p className='text-sm font-semibold'>Chelsea Immanuela</p>
          <p className='text-xs text-gray-500'>Personal Account</p>
        </div>
      </div>

      {/* Desktop: Logo */}
      <img src='/asset/walled.png' alt='Logo' className='hidden lg:block h-6' />

      {/* Desktop nav links */}
      <div className='hidden lg:flex items-center gap-6'>
        <a href='/' className='nav-link'>
          Dashboard
        </a>
        <a href='/transfer' className='nav-link'>
          Transfer
        </a>
        <a href='/top-up' className='nav-link'>
          Top Up
        </a>
        <a href='/login' onClick={onLogout} className='nav-link'>
          Sign Out
        </a>
        <p>|</p>
        <img src='/asset/mode.png' alt='Mode' className='h-5' />
      </div>

      {/* Mobile: Mode + Hamburger */}
      <div className='flex lg:hidden items-center gap-4'>
        <img src='/asset/mode.png' alt='Mode Icon' className='h-5' />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='focus:outline-none'
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className='absolute top-[8vh] left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col gap-4 lg:hidden z-40'>
          <a href='/' className='nav-link'>
            Dashboard
          </a>
          <a href='/transfer' className='nav-link'>
            Transfer
          </a>
          <a href='/top-up' className='nav-link'>
            Top Up
          </a>
          <a href='/login' onClick={onLogout} className='nav-link'>
            Sign Out
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
