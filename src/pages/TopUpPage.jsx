import React, { useState } from 'react'

const dummyReceivers = [
  { id: 1, name: 'Giz', account: '900782139' },
  { id: 2, name: 'John Doe', account: '123456789' },
  { id: 3, name: 'Jane Smith', account: '987654321' },
]

const TopUpPage = () => {
  const [selectedReceiver, setSelectedReceiver] = useState(dummyReceivers[0].id)

  const handleSelectChange = (event) => {
    setSelectedReceiver(parseInt(event.target.value, 10))
  }

  return (
    <div className='min-h-screen'>
      {/* mobile */}
      <div className='block lg:hidden'>
        <div className='min-h-screen bg-[#f6f6f6] px-4 py-6 lg:py-10 flex flex-col items-center'>
          <div className='w-full max-w-md'>
            {/* Header */}
            <h2 className='text-lg font-bold text-black mb-4 lg:hidden'>
              Top Up
            </h2>

            {/* Amount */}
            <div className='bg-[#f9f9f9] rounded-md p-4 mb-4'>
              <label className='text-gray-400 text-sm'>Amount</label>
              <div className='flex items-end gap-2 mt-1'>
                <span className='text-sm font-semibold'>IDR</span>
                <p className='text-2xl font-semibold text-black'>100.000</p>
              </div>
            </div>

            {/* Sender Selector */}
            <div className='bg-[#f9f9f9] text-white px-4 py-3 rounded-md flex justify-between items-center mb-4'>
              {/* <label className='text-gray-400 font-semibold mr-2'>From:</label> */}
              <select
                className='bg-transparent text-black flex-1 focus:outline-none appearance-none pr-6'
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
                className='w-4 h-4 ml-2 text-black pointer-events-none'
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

            {/* Notes */}
            <div className='bg-[#f9f9f9] rounded-md p-4 mb-6'>
              <label className='text-gray-400 text-sm mb-1 block'>Notes</label>
              <input
                type='text'
                className='w-full bg-transparent border-b border-gray-300 focus:outline-none text-sm text-black'
                placeholder='Write a note...'
              />
            </div>

            {/* Button */}
            <button className='w-full py-3 bg-[#0057FF] text-white font-semibold rounded-lg shadow-md'>
              Top Up
            </button>
          </div>
        </div>
      </div>
      {/* desktop */}
      <div className='hidden lg:block'>
        <div className='flex flex-col justify-center items-center min-h-[90vh] bg-[#f6f6f6] px-4'>
          <div className='w-full max-w-md p-6'>
            <h2 className='text-lg font-bold mb-4 ml-2'>Top Up</h2>
            <div className='bg-white w-full max-w-md p-6 rounded-2xl shadow text-left'>
              {/* Amount Section */}
              <div className='bg-gray-100 p-4 rounded-xl mb-2'>
                <span className='text-sm font-semibold text-gray-700'>
                  Amount
                </span>
                <p className='text-2xl font-bold text-gray-900 mt-1'>
                  IDR 150.000,00
                </p>
                <hr className='border-black mt-2' />
              </div>

              {/* Dropdown Select */}
              <div className='flex items-center justify-between bg-gray-100 rounded-[10px] shadow-sm mb-4'>
                <span className='bg-gray-300 px-4 py-3 rounded-[20px] font-bold text-sm'>
                  From
                </span>
                <select
                  className='bg-transparent text-sm text-gray-800 focus:outline-none flex-1 ml-3 mr-3'
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

              {/* Notes Input */}
              <div className='bg-gray-100 p-3 rounded-xl mb-6'>
                <label className='text-sm font-semibold text-gray-700 mb-1 block'>
                  Notes:
                </label>
                <input
                  type='text'
                  placeholder='Write a note...'
                  className='w-full bg-transparent focus:outline-none text-sm'
                />
              </div>

              {/* Button */}
              <button className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-md transition'>
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopUpPage
