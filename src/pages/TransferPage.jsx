import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const dummyReceivers = [
  { id: 1, name: 'Giz', account: '900782139' },
  { id: 2, name: 'John Doe', account: '123456789' },
  { id: 3, name: 'Jane Smith', account: '987654321' },
]

const TransferPage = () => {
  const navigate = useNavigate()
  const [selectedReceiver, setSelectedReceiver] = useState(dummyReceivers[0].id)

  const handleSelectChange = (event) => {
    setSelectedReceiver(parseInt(event.target.value, 10))
  }

  return (
    <div className='min-h-screen'>
      {/* mobile */}
      <div className='block lg:hidden bg-[#f9f9f9] text-black dark:bg-black dark:text-white'>
        <div className='min-h-screen px-4 py-6 lg:py-10 flex flex-col items-center'>
          <div className='w-full max-w-md'>
            {/* Header */}
            <h2 className='text-lg font-bold mb-4 lg:hidden'>Transfer</h2>

            {/* Receiver Selector */}
            <div className='bg-[#0057FF] text-white px-4 py-3 rounded-xl flex justify-between items-center mb-4'>
              <label className='text-white font-semibold mr-2'>To:</label>
              <select
                className='bg-transparent text-white flex-1 focus:outline-none appearance-none pr-6'
                value={selectedReceiver}
                onChange={handleSelectChange}
              >
                {dummyReceivers.map((receiver) => (
                  <option
                    key={receiver.id}
                    value={receiver.id}
                    className='text-black'
                  >
                    {receiver.account} ({receiver.name})
                  </option>
                ))}
              </select>

              {/* Down Arrow Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4 ml-2 text-white pointer-events-none'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>

            {/* Amount */}
            <div className='rounded-xl p-4 mb-4 bg-[#f9f9f9] dark:bg-[#272727] dark:text-white'>
              <label className='text-gray-400 text-sm'>Amount</label>
              <div className='flex items-end gap-2 mt-1'>
                <span className='text-sm font-semibold'>IDR</span>
                <p className='text-2xl font-semibold'>100.000</p>
              </div>
              <div className='flex justify-between items-center border-t border-gray-300 pt-2 mt-2'>
                <span className='text-xs text-gray-400'>Balance</span>
                <span className='text-xs text-blue-600 font-semibold'>
                  IDR 10.000.000
                </span>
              </div>
            </div>

            {/* Notes */}
            <div className='bg-[#f9f9f9] rounded-xl p-4 mb-6 dark:bg-[#272727] dark:text-white'>
              <label className='text-gray-400 text-sm mb-1 block'>Notes</label>
              <input
                type='text'
                className='w-full bg-transparent border-b border-gray-300 focus:outline-none text-sm text-black'
                placeholder='Write a note...'
              />
            </div>

            {/* Button */}
            <button
              className='w-full py-3 bg-[#0057FF] text-white font-semibold rounded-lg shadow-md'
              onClick={() => navigate('/transaction-success')}
            >
              Transfer
            </button>
          </div>
        </div>
      </div>
      {/* desktop */}
      <div className='hidden lg:block'>
        <div className='flex flex-col justify-center items-center min-h-[90vh] px-4  bg-[#f9f9f9] text-black dark:bg-black dark:text-white'>
          <div className='w-full max-w-md p-6'>
            <h2 className='text-lg font-bold mb-4 ml-2'>Transfer</h2>
            <div className='bg-white w-full max-w-md p-6 rounded-2xl shadow text-left dark:bg-[#272727] dark:text-white'>
              {/* Dropdown Select */}
              <div className='flex items-center justify-between bg-gray-100 rounded-[10px] shadow-sm mb-4 dark:bg-black dark:text-white'>
                <span className='bg-gray-300 px-4 py-3 rounded-[20px] font-bold text-sm'>
                  To
                </span>
                <select
                  className='bg-transparent text-sm text-800 focus:outline-none flex-1 ml-3 mr-3'
                  value={selectedReceiver}
                  onChange={handleSelectChange}
                >
                  {dummyReceivers.map((receiver) => (
                    <option key={receiver.id} value={receiver.id}>
                      {receiver.account} ({receiver.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Section */}
              <div className='bg-gray-100 p-4 rounded-xl mb-2 dark:bg-black dark:text-white'>
                <span className='text-sm font-semibold text-700'>Amount</span>
                <p className='text-2xl font-bold text-900 mt-1'>
                  IDR 150.000,00
                </p>
                <hr className='border-black mt-2' />
              </div>
              <p className='text-sm text-gray-500 mb-4'>
                Balance:{' '}
                <span className='text-teal-600 font-medium'>
                  IDR 10.000.000
                </span>
              </p>

              {/* Notes Input */}
              <div className='bg-gray-100 p-3 rounded-xl mb-6 dark:bg-black dark:text-white'>
                <label className='text-sm font-semibold text-700 mb-1 block'>
                  Notes:
                </label>
                <input
                  type='text'
                  placeholder='Write a note...'
                  className='w-full bg-transparent focus:outline-none text-sm'
                />
              </div>

              {/* Button */}
              <button
                className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-md transition'
                onClick={() => navigate('/transaction-success')}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransferPage
