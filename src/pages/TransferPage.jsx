const dummyReceivers = [
  { id: 1, name: 'Giz', account: '900782139' },
  { id: 2, name: 'John Doe', account: '123456789' },
  { id: 3, name: 'Jane Smith', account: '987654321' },
]
import React, { useState } from 'react'

const Transfer = () => {
  const [toAccount, setToAccount] = useState('9007822139 (Giz)')
  const [amount, setAmount] = useState('15000000')
  const [balance] = useState('10000000')
  const [notes, setNotes] = useState('')

  const handleTransfer = () => {
    // Handle transfer logic here
    console.log('Transferring...', { toAccount, amount, notes })
  }

  return (
    <div className='max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold'>Transfer</h1>
      <div className='mt-4'>
        <label className='block text-sm font-medium text-gray-700'>To</label>
        <div className='mt-1'>
          <select
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            className='block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
          >
            <option value='9007822139 (Giz)'>9007822139 (Giz)</option>
            {/* Add more options if needed */}
          </select>
        </div>
      </div>

      <div className='mt-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Amount
        </label>
        <div className='mt-1'>
          <input
            type='text'
            value={`IDR ${amount.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
            className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
          />
        </div>
        <p className='mt-1 text-sm text-gray-500'>
          Balance: IDR {balance.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        </p>
      </div>

      <div className='mt-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Notes:
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className='block w-full h-24 p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
        />
      </div>

      <div className='mt-6'>
        <button
          onClick={handleTransfer}
          className='w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        >
          Transfer
        </button>
      </div>
    </div>
  )
}

export default Transfer
