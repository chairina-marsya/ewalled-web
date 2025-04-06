import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const isPositive = (amount) => amount > 0

const transactions = [
  {
    date: '20:10 - 30 June 2022',
    type: 'Transfer',
    from: 'Sendy',
    description: 'Fore Coffee',
    amount: -75000,
  },
  {
    date: '20:10 - 30 June 2022',
    type: 'Topup',
    from: '',
    description: 'Topup from Bank Transfer',
    amount: 1000000,
  },
]

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [order, setOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const { isDark } = useTheme()

  const filteredTransactions = transactions
    .filter((t) => t.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') return order === 'desc' ? -1 : 1
      if (sortBy === 'amount')
        return order === 'desc' ? b.amount - a.amount : a.amount - b.amount
    })

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <div className='min-h-screen bg-[#f9f9f9] text-black dark:bg-black dark:text-white'>
      {/* Mobile Version */}
      <div className='block lg:hidden'>
        {/* insert the mobile JSX here based on your mockup */}
        <div className='px-4 py-4 lg:px-10 lg:py-6'>
          {/* Top Header */}
          <div className='flex items-center justify-between mb-4'></div>

          {/* Greeting Section */}
          <div className='flex justify-between mb-5'>
            <div>
              <p className='text-lg font-bold'>Good Morning, Chelsea</p>
              <p className='text-sm text-gray-600'>
                Check all your incoming and outgoing transactions here
              </p>
            </div>
            <img
              src={isDark ? '/asset/moonface.png' : '/asset/sunface.png'}
              alt='modeface'
              className='w-20 mt-2'
            />
          </div>

          {/* Account No */}
          <div className='bg-blue-600 px-4 py-4 rounded-xl mb-4 flex justify-between bg-[#f9f9f9] text-black dark:bg-[#272727] dark:text-white'>
            <p className='text-md'>Account No.</p>
            <p className='text-md'>100899</p>
          </div>

          {/* Balance Card */}
          <div className='flex justify-between items-center relative bg-white px-4 py-4 rounded-xl mb-4 shadow bg-[#f9f9f9] text-black dark:bg-[#272727] dark:text-white'>
            <div>
              <p className='text-sm'>Balance</p>
              <div className='flex items-center'>
                <p className='text-xl font-bold w-50'>Rp 10.000.000</p>
                <img
                  height='15'
                  src='/asset/visibility.png'
                  alt='Visibility'
                  className='w-5 h-5 cursor-pointer'
                />
              </div>
            </div>

            <div className='right-4 flex flex-col gap-2'>
              <div className='cursor-pointer bg-[#0061FF] shadow-[0px_0px_10px_0px_#19918F] p-2 rounded-md inline-flex items-center justify-center w-10 h-10'>
                <img
                  height='20'
                  src='/asset/addicon.png'
                  alt='Add'
                  className='object-cover'
                />
              </div>
              <div className='cursor-pointer bg-[#0061FF] shadow-[0px_0px_10px_0px_#19918F] p-2 rounded-md inline-flex items-center justify-center w-10 h-10'>
                <img
                  height='20'
                  src='/asset/share.png'
                  alt='Share'
                  className='object-cover'
                />
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className='p-4 mt-8 rounded-xl shadow-md bg-[#f9f9f9] text-black dark:bg-[#272727] dark:text-white'>
            <p className='font-semibold text-base mb-4'>Transaction History</p>
            <hr className='border-t border-gray-300 dark:border-white my-4' />
            <div className='space-y-4'>
              {transactions.map((t, index) => (
                <div key={index} className='flex items-start gap-3'>
                  <div className='w-8 h-8 rounded-full bg-gray-300'></div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>{t.from || ''}</p>
                    <p className='text-sm text-gray-500'>{t.type}</p>
                    <p className='text-xs text-gray-400'>{t.date}</p>
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      isPositive(t.amount) ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {isPositive(t.amount) ? '+' : '-'}{' '}
                    {Math.abs(t.amount).toLocaleString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className='hidden lg:block'>
        <div className='px-10 py-4'>
          <div className='flex justify-between items-center mb-5'>
            <div>
              <p className='text-2xl font-bold'>Good Morning, Chelsea</p>
              <p className='text-sm'>
                Check all your incoming and outgoing transactions here
              </p>
            </div>
            <div className='flex items-center gap-4'>
              <div>
                <p className='text-end text-sm font-bold'>Chelsea Immanuela</p>
                <p className='text-end text-xs'>Personal Account</p>
              </div>
              <div className='w-12 h-12 border-5 border-blue-600 rounded-full overflow-hidden'>
                <img
                  src='https://images.unsplash.com/photo-1574169207511-e21a21c8075a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt='Profile'
                  className='object-cover w-full h-full'
                />
              </div>
            </div>
          </div>

          <div className='flex justify-between flex-col lg:flex-row gap-4'>
            <div className='bg-blue-600 text-white p-4 lg:p-8 rounded-xl w-full lg:w-1/5'>
              <p className='text-sm'>Account No.</p>
              <p className='text-2xl font-bold'>100899</p>
            </div>
            <div className='bg-white w-3/4 p-8 rounded-xl bg-[#f9f9f9] text-black dark:bg-[#272727] dark:text-white'>
              <p className='text-sm'>Balance</p>
              <div className='flex justify-between items-center'>
                <p className='text-2xl font-bold'>Rp 10.000.000,00</p>
                <img
                  height='15'
                  src='/asset/visibility.png'
                  alt='Visibility'
                  className='cursor-pointer'
                />
                <div className='flex gap-5'>
                  <div className='cursor-pointer bg-[#0061FF] shadow-[0px_0px_10px_0px_#19918F] p-2 rounded-md inline-flex items-center justify-center w-10 h-10'>
                    <img
                      height='20'
                      src='/asset/addicon.png'
                      alt='Add'
                      className='object-cover'
                    />
                  </div>
                  <div className='cursor-pointer bg-[#0061FF] shadow-[0px_0px_10px_0px_#19918F] p-2 rounded-md inline-flex items-center justify-center w-10 h-10'>
                    <img
                      height='20'
                      src='/asset/share.png'
                      alt='Share'
                      className='object-cover'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 mt-6 rounded-lg shadow-lg  bg-[#f9f9f9] text-black dark:bg-[#272727] dark:text-white'>
            <div className='flex justify-between mb-6'>
              <div
                className='flex items-center border p-2 rounded-lg shadow-sm'
                style={{
                  border: '1px solid #FFFFFF',
                  boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                }}
              >
                <Search className='mr-2' size={18} />
                <input
                  className='outline-none border-none bg-transparent text-black dark:bg-[#272727] dark:text-white'
                  placeholder='Search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <label className='text-sm'>Show</label>
                  <select
                    className='p-2 border rounded-md shadow-sm text-sm'
                    style={{
                      border: '1px solid #FFFFFF',
                      boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                    }}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value='5'>Show 5 Transactions</option>
                    <option value='10'>Show 10 Transactions</option>
                    <option value='20'>Show 20 Transactions</option>
                  </select>
                </div>
                <div className='flex items-center gap-2'>
                  <label className='text-sm'>Sort By</label>
                  <select
                    className='p-2 border rounded-md shadow-sm text-sm'
                    style={{
                      border: '1px solid #FFFFFF',
                      boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                    }}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                  </select>
                  <select
                    className='p-2 border rounded-md shadow-sm text-sm'
                    style={{
                      border: '1px solid #FFFFFF',
                      boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                    }}
                    onChange={(e) => setOrder(e.target.value)}
                  >
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table with updated styling */}
            <table className='table'>
              <thead>
                <tr>
                  <th className='px-4 py-2 text-left'>Date & Time</th>
                  <th className='px-4 py-2 text-left'>Type</th>
                  <th className='px-4 py-2 text-left'>From / To</th>
                  <th className='px-4 py-2 text-left'>Description</th>
                  <th className='px-4 py-2 text-left'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((t, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'dark:text-black' : 'unset'}
                  >
                    <td className='px-4 py-2'>{t.date}</td>
                    <td className='px-4 py-2'>{t.type}</td>
                    <td className='px-4 py-2'>{t.from}</td>
                    <td className='px-4 py-2'>{t.description}</td>
                    <td
                      className={`px-4 py-2 ${
                        t.amount > 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {t.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='pagination'>
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className={`pagination-button ${page === 1 ? 'disabled' : ''}`}
              >
                First
              </button>
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`pagination-button ${page === 1 ? 'disabled' : ''}`}
              >
                <ChevronLeft size={16} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`pagination-button ${
                    page === i + 1 ? 'active' : ''
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className={`pagination-button ${
                  page === totalPages ? 'disabled' : ''
                }`}
              >
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className={`pagination-button ${
                  page === totalPages ? 'disabled' : ''
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage
