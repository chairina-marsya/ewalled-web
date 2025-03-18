import React from 'react'
import './Home.css'

const HomePage = () => {
  return (
    <>
      <nav className='nav'>
        <img height='25' src='/asset/walled.png' alt='Logo' />
        <div className='nav-links'>
          <a href='#' className='nav-link'>
            Dashboard
          </a>
          <a href='#' className='nav-link'>
            Transfer
          </a>
          <a href='#' className='nav-link'>
            Top Up
          </a>
          <a href='#' className='nav-link'>
            Sign Out <span className='vl'></span>
          </a>
          <img height='20' src='/asset/mode.png' alt='Mode Icon' />
        </div>
      </nav>
      <div className='container'>
        <div className='greeting'>
          <div>
            <p className='greeting-title'>Good Morning, Chelsea</p>
            <p className='greeting-subtitle'>
              Check all your incoming and outgoing transactions here
            </p>
          </div>
          <div className='profile-section'>
            <div>
              <p className='profile-name'>Chelsea Immanuela</p>
              <p className='profile-type'>Personal Account</p>
            </div>
            <div className='profile-photo'>
              <img
                src='https://images.unsplash.com/photo-1574169207511-e21a21c8075a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='Profile'
              />
            </div>
          </div>
        </div>
        <div className='amount'>
          <div className='act_num account-info'>
            <p>Account No.</p>
            <p className='amount_num'>100899</p>
          </div>
          <div className='act_num account-balance'>
            <div>
              <p>Balance</p>
              <div className='balance-details'>
                <div className='balance-amount'>
                  <p className='amount_num'>Rp 10.000.000,00</p>
                  <span className='visibility'>
                    <img
                      height='20'
                      src='/asset/visibility.png'
                      alt='Visibility'
                    />
                  </span>
                </div>
                <div className='account-actions'>
                  <div className='account_icon'>
                    <img height='20' src='/asset/addicon.png' alt='Add' />
                  </div>
                  <div className='account_icon'>
                    <img height='20' src='/asset/share.png' alt='Share' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
