import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useUserStore } from '../../../store/userStore'

const Navbar = ({ onLogout }) => {
  const { toggleTheme, isDark } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const { user } = useUserStore()

  if (!user) return <p id='loading-account'>Loading Profile...</p>

  return (
    <nav className='sticky top-0 z-50 px-6 py-3 h-[8vh] flex justify-between items-center shadow-sm bg-white text-black dark:bg-[#272727] dark:text-white'>
      {/* Mobile: Avatar + Name */}
      <div className='flex items-center gap-3 lg:hidden'>
        <img
          id='avatar-account'
          src={user?.avatarUrl || '/asset/avatar.svg'}
          alt='Profile'
          className='w-10 h-10 rounded-full object-cover'
        />
        <div className='flex flex-col'>
          <p id='name-account' className='text-sm font-semibold'>
            {user?.fullname}
          </p>
          <p id='title-name-account' className='text-xs text-gray-500'>
            Personal Account
          </p>
        </div>
      </div>

      {/* Desktop: Logo */}
      <img
        id='walled-logo'
        src={isDark ? '/asset/walledwhite.svg' : '/asset/walled.svg'}
        alt='Logo'
        className='hidden lg:block h-8'
      />

      {/* Desktop nav links */}
      <div className='hidden lg:flex items-center gap-6'>
        <a id='dashboard-link' href='/' className='nav-link'>
          Dashboard
        </a>
        <a id='summary-link' href='/summary' className='nav-link'>
          Summary
        </a>
        <a id='transfer-link' href='/transfer' className='nav-link'>
          Transfer
        </a>
        <a id='topup-link' href='/top-up' className='nav-link'>
          Top Up
        </a>
        <a id='signout-link' onClick={onLogout} className='nav-link'>
          Sign Out
        </a>
        <p>|</p>
        <div id='mode-togle' onClick={toggleTheme}>
          <img
            id='mode-logo'
            src={isDark ? '/asset/mode.png' : '/asset/moon.png'}
            alt='Mode'
            className='h-5 cursor-pointer'
          />
        </div>
      </div>

      {/* Mobile: Mode + Hamburger */}
      <div className='flex lg:hidden items-center gap-4'>
        <div id='mode-togle' onClick={toggleTheme}>
          <img
            id='mode-logo'
            src={isDark ? '/asset/mode.png' : '/asset/moon.png'}
            alt='Mode'
            className='h-5 cursor-pointer'
          />
        </div>
        <button
          id='humberger-button'
          onClick={() => setMenuOpen(!menuOpen)}
          className='focus:outline-none'
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className='absolute top-[8vh] left-0 w-full shadow-md px-6 py-4 flex flex-col gap-4 lg:hidden z-40 bg-white text-black dark:bg-[#272727] dark:text-white'>
          <a id='dashboard-link' href='/' className='nav-link'>
            Dashboard
          </a>
          <a id='summary-link' href='/summary' className='nav-link'>
            Summary
          </a>
          <a id='transfer-link' href='/transfer' className='nav-link'>
            Transfer
          </a>
          <a id='topup-link' href='/top-up' className='nav-link'>
            Top Up
          </a>
          <a id='signout-link' onClick={onLogout} className='nav-link'>
            Sign Out
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
