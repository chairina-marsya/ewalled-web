import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWalletStore } from '../../store/walletStore'
import { showAlert } from '../components/organisms/ShowAlert'

const TransferPage = () => {
  const navigate = useNavigate()
  const [selectedReceiver, setSelectedReceiver] = useState({})
  const [accountData, setAccountData] = useState([])
  const [receiverAcc, setReceiverAcc] = useState([])
  const [amount, setAmount] = useState(null)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const { wallet } = useWalletStore()

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('token')
    if (!token || token === null || token === undefined) {
      showAlert(
        `Sesi anda habis. Silahkan login kembali.`,
        'OK',
        handleConfirmLogout
      )
    }

    try {
      axios
        .get('https://kel-1-rakamin-walled-server.onrender.com/api/wallets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoading(false)
          const { data } = response.data
          console.log(data)
          setAccountData(filteredWallets(data).currAcct)
          setReceiverAcc(filteredWallets(data).otherAcct)
          setSelectedReceiver(filteredWallets(data).otherAcct[0])
        })
        .catch((error) => {
          setLoading(false)
          console.error('Error fetching wallets:', error)
        })
    } catch (error) {
      const inline = error.response.data.message
      console.error('Error fetching wallet:', error)
      showAlert(`Oop! ${inline}`, 'OK', null)
    }
  }, [])

  const filteredWallets = (data) => {
    const { id } = wallet
    const currAcct = data.filter((item) => item.id === id)
    const otherAcct = data.filter((item) => item.id !== id)

    return { currAcct, otherAcct }
  }

  const handleSelectChange = (event) => {
    setSelectedReceiver(event.target.value)
  }

  const handleConfirmLogout = () => {
    navigate('/login')
  }

  const toRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number)
  }

  const onTransactionRequest = () => {
    setLoading(true)
    const token = localStorage.getItem('token')
    const url =
      'https://kel-1-rakamin-walled-server.onrender.com/api/transactions'

    const data = {
      walletId: wallet.id,
      transactionType: 'TRANSFER',
      amount: amount,
      recipientAccountNumber: selectedReceiver.accountNumber,
      description: description,
      option: '',
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    axios
      .post(url, data, { headers })
      .then((response) => {
        setLoading(false)
        console.log('Success:', response.data)
        // navigate('/transaction-success')
        navigate('/transaction-success', {
          state: response.data.data,
        })
      })
      .catch((error) => {
        setLoading(false)
        console.error('Error:', error)
        const inline = error.response.data.message
        showAlert(`Oops. ${inline}.`, 'OK', null)
      })
  }

  return (
    <div className='min-h-screen'>
      {/* mobile */}
      <div className='block lg:hidden bg-[#f9f9f9] text-black dark:bg-black dark:text-white'>
        <div className='min-h-screen px-4 py-6 lg:py-10 flex flex-col items-center'>
          <div className='w-full max-w-md'>
            {/* Header */}
            <h2
              className='text-lg font-bold mb-4 lg:hidden'
              id='transfer-title'
            >
              Transfer
            </h2>

            {/* Receiver Selector */}
            <div className='bg-[#0057FF] text-white px-4 py-3 rounded-xl flex justify-between items-center mb-4'>
              <label className='text-white font-semibold mr-2' id='to-title'>
                To:
              </label>
              <select
                id='to-account'
                className='bg-transparent text-white flex-1 focus:outline-none appearance-none pr-6'
                value={selectedReceiver}
                onChange={handleSelectChange}
              >
                {receiverAcc &&
                  receiverAcc.map((receiver) => (
                    <option
                      key={receiver.id}
                      value={receiver.accountNumber}
                      className='text-black'
                    >
                      {receiver.accountNumber} ({receiver.user.fullname})
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
              <label className='text-gray-400 text-sm' id='amount-title'>
                Amount
              </label>
              <div className='flex items-end gap-2 mt-1'>
                <span className='text-sm font-semibold'>IDR</span>
                <input
                  id='amount'
                  type='number'
                  placeholder='10.000'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className='w-full bg-transparent border-none text-2xl font-semibold dark:bg-[#272727] dark:text-white'
                />
              </div>
              <div className='flex justify-between items-center border-t border-gray-300 pt-2 mt-2'>
                <span className='text-xs text-gray-400' id='balance-title'>
                  Balance
                </span>
                <span
                  className='text-xs text-blue-600 font-semibold'
                  id='balance'
                >
                  {toRupiah(accountData?.[0]?.balance ?? 0)}
                </span>
              </div>
            </div>

            {/* Notes */}
            <div className='bg-[#f9f9f9] rounded-xl p-4 mb-6 dark:bg-[#272727] dark:text-white'>
              <label
                className='text-gray-400 text-sm mb-1 block'
                id='notes-title'
              >
                Notes
              </label>
              <input
                id='notes'
                type='text'
                className='w-full bg-transparent border-b border-gray-300 focus:outline-none text-sm text-black'
                placeholder='Write a note...'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              id='transfer-button'
              className={`w-full py-3 text-white font-semibold rounded-lg shadow-md ${
                !loading
                  ? 'bg-[#0057FF] hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed opacity-60'
              }`}
              onClick={() => onTransactionRequest()}
            >
              {loading ? '...loading' : 'Transfer'}
            </button>
          </div>
        </div>
      </div>
      {/* desktop */}
      <div className='hidden lg:block'>
        <div className='flex flex-col justify-center items-center min-h-[90vh] px-4  bg-[#f9f9f9] text-black dark:bg-black dark:text-white'>
          <div className='w-full max-w-md p-6'>
            <h2 className='text-lg font-bold mb-4 ml-2' id='transfer-title'>
              Transfer
            </h2>
            <div className='bg-white w-full max-w-md p-6 rounded-2xl shadow text-left dark:bg-[#272727] dark:text-white'>
              {/* Dropdown Select */}
              <div className='flex items-center justify-between bg-gray-100 rounded-[10px] shadow-sm mb-4 dark:bg-black dark:text-white'>
                <span
                  className='bg-gray-300 px-4 py-3 rounded-[20px] font-bold text-sm'
                  id='to-title'
                >
                  To
                </span>
                <select
                  id='to-account'
                  className='bg-transparent text-sm text-800 focus:outline-none flex-1 ml-3 mr-3'
                  value={selectedReceiver}
                  onChange={handleSelectChange}
                >
                  {receiverAcc &&
                    receiverAcc.map((receiver) => (
                      <option key={receiver.id} value={receiver.id}>
                        {receiver.accountNumber} ({receiver.user.fullname})
                      </option>
                    ))}
                </select>
              </div>

              {/* Amount Section */}
              <div className='bg-gray-100 p-4 rounded-xl mb-2 dark:bg-black dark:text-white'>
                <div className='flex items-end gap-2 mt-1'>
                  <span className='text-sm font-semibold'>IDR</span>
                  <input
                    id='amount'
                    type='number'
                    placeholder='10.000'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className='w-full bg-transparent border-none text-2xl font-semibold dark:bg-[#272727] dark:text-white'
                  />
                </div>
                <hr className='border-black mt-2' />
              </div>
              <p className='text-sm text-gray-500 mb-4' id='balance-title'>
                Balance:{' '}
                <span className='text-teal-600 font-medium' id='balance'>
                  {toRupiah(accountData?.[0]?.balance ?? 0)}
                </span>
              </p>

              {/* Notes Input */}
              <div className='bg-gray-100 p-3 rounded-xl mb-6 dark:bg-black dark:text-white'>
                <label
                  className='text-sm font-semibold text-700 mb-1 block'
                  id='notes-title'
                >
                  Notes:
                </label>
                <input
                  id='notes'
                  type='text'
                  placeholder='Write a note...'
                  className='w-full bg-transparent focus:outline-none text-sm'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Button */}
              <button
                id='transfer-button'
                className={`w-full py-3 text-white text-lg font-semibold rounded-xl shadow-md transition ${
                  !loading
                    ? 'bg-[#0057FF] hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed opacity-60'
                }`}
                onClick={() => onTransactionRequest()}
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
