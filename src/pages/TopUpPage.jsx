import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useWalletStore } from '../../store/walletStore'
import { showAlert } from '../components/organisms/ShowAlert'
import { createTopUpTransaction } from '../services/transactionService'
import {
  backToLogin,
  formatRupiahInput,
  handleChangeOnlyDigit,
} from '../utils/functions'

const dummyReceivers = [
  { id: 1, name: 'BYOND Pay' },
  { id: 2, name: 'Credit card' },
  { id: 3, name: 'Bank transfer' },
]

const TopUpPage = () => {
  const [selectedReceiver, setSelectedReceiver] = useState(
    dummyReceivers[0].name
  )
  const [amount, setAmount] = useState(null)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const { wallet } = useWalletStore()
  const navigate = useNavigate()

  const handleSelectChange = (event) => {
    setSelectedReceiver(event.target.value)
  }

  const onTransactionRequest = () => {
    setLoading(true)
    createTopUpTransaction(wallet.id, amount, description, selectedReceiver)
      .then((data) => {
        navigate('/transaction-success', { state: data })
      })
      .catch((error) => {
        const inline = error?.response?.data?.message || 'Transaksi gagal.'
        const status = error?.response?.status
        showAlert(`Oops. ${inline}`, 'OK', () => backToLogin(status))
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className='min-h-screen  bg-[#f9f9f9] text-black dark:bg-black dark:text-white'>
      {/* mobile */}
      <div className='block lg:hidden'>
        <div className='min-h-screen px-4 py-6 lg:py-10 flex flex-col items-center bg-[#f9f9f9] text-black dark:bg-black dark:text-white'>
          <div className='w-full max-w-md'>
            {/* Header */}
            <h2 className='text-lg font-bold mb-4 lg:hidden' id='topup-title'>
              Top Up
            </h2>

            {/* Amount */}
            <div className='rounded-md p-4 mb-4 bg-white dark:bg-[#272727] dark:text-white'>
              <label className='text-black-400 text-sm' id='amount-title'>
                Amount
              </label>
              <div className='flex items-center gap-2 mt-1'>
                <span className='text-2xl '>Rp</span>
                <input
                  id='amount'
                  type='text'
                  placeholder='10.000'
                  value={formatRupiahInput(amount)}
                  onChange={(e) =>
                    setAmount(handleChangeOnlyDigit(e.target.value))
                  }
                  className='w-full bg-transparent border-none text-2xl font-semibold dark:bg-[#272727] dark:text-white'
                />
              </div>
            </div>

            {/* Sender Selector */}
            <div className='px-4 py-3 rounded-md flex justify-between items-center mb-4  bg-white dark:bg-[#272727] dark:text-white'>
              {/* <label className='text-gray-400 font-semibold mr-2'>From:</label> */}
              <select
                id='receiver'
                className='bg-transparent flex-1 focus:outline-none appearance-none pr-6'
                value={selectedReceiver}
                onChange={handleSelectChange}
              >
                {dummyReceivers.map((receiver) => (
                  <option
                    key={receiver.id}
                    value={receiver.name}
                    className='text-black'
                  >
                    {receiver.name}
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
            <div className='bg-[#f9f9f9] rounded-md p-4 mb-6 bg-white dark:bg-[#272727] dark:text-white'>
              <label className='text-400 text-sm mb-1 block' id='notes-title'>
                Notes
              </label>
              <input
                id='notes'
                type='text'
                className='w-full bg-transparent border-b border-gray-300 focus:outline-none text-sm dark:text-white'
                placeholder='Write a note...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              id='topup-button'
              className={`w-full py-3 text-white font-semibold rounded-lg shadow-md ${
                !loading
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed opacity-60'
              }`}
              onClick={() => onTransactionRequest()}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className='mx-auto h-5 w-5 animate-spin' />
              ) : (
                'Top Up'
              )}
            </button>
          </div>
        </div>
      </div>
      {/* desktop */}
      <div className='hidden lg:block'>
        <div className='flex flex-col justify-center items-center min-h-[90vh] px-4'>
          <div className='w-full max-w-md p-6'>
            <h2 className='text-lg font-bold mb-4 ml-2' id='topup-title'>
              Top Up
            </h2>
            <div className='w-full max-w-md p-6 rounded-2xl shadow text-left dark:bg-[#272727] dark:text-white'>
              {/* Amount Section */}
              <div className='bg-gray-100 p-4 rounded-xl mb-2 dark:bg-black dark:text-white'>
                <p
                  className='text-sm text-black-700 dark:text-white'
                  id='amount-title'
                >
                  Amount
                </p>
                <div className='flex items-center gap-3'>
                  <p className='text-2xl'>Rp</p>
                  <input
                    id='amount'
                    type='text'
                    placeholder='10.000'
                    value={formatRupiahInput(amount)}
                    onChange={(e) =>
                      setAmount(handleChangeOnlyDigit(e.target.value))
                    }
                    className='w-full bg-transparent border-none text-2xl font-semibold dark:bg-[#272727] dark:text-white'
                  />
                </div>
                <hr className='border-black mt-2' />
              </div>

              {/* Dropdown Select */}
              <div className='flex items-center justify-between bg-gray-100 rounded-xl shadow-sm mb-4 dark:bg-black dark:text-white'>
                <span
                  className='bg-gray-300 px-4 py-3 rounded-xl font-bold text-sm dark:text-white'
                  id='from-title'
                >
                  From
                </span>
                <select
                  id='from-account'
                  className='bg-transparent text-sm text-gray-800 focus:outline-none flex-1 ml-3 mr-3 dark:text-white'
                  value={selectedReceiver}
                  onChange={handleSelectChange}
                >
                  {dummyReceivers.map((receiver) => (
                    <option key={receiver.id} value={receiver.name}>
                      {receiver.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes Input */}
              <div className='bg-gray-100 p-3 rounded-xl mb-6 dark:bg-black dark:text-white'>
                <label
                  className='text-sm font-semibold text-gray-700 mb-1 block dark:text-white'
                  id='notes-title'
                >
                  Notes:
                </label>
                <input
                  id='notes'
                  type='text'
                  placeholder='Write a note...'
                  className='w-full bg-transparent focus:outline-none text-smdark:text-white'
                  // value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Button */}
              <button
                id='topup-button'
                className={`w-full py-3 text-white text-lg font-semibold rounded-xl shadow-md transition ${
                  !loading
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed opacity-60'
                }`}
                onClick={() => onTransactionRequest()}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className='mx-auto h-5 w-5 animate-spin' />
                ) : (
                  'Top Up'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopUpPage
