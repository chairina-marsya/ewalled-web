import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { showAlert } from '../components/organisms/ShowAlert'
import { useUserStore } from '../../store/userStore'
import { useWalletStore } from '../../store/walletStore'
import moment from 'moment'
import LinkText from '../components/atoms/LinkText'
import { getTimeGreeting, toRupiah } from '../utils/functions'
import {
  createWallet,
  fetchTransactionHistory,
  fetchUserData,
  fetchWalletByUser,
} from '../services/dashboardService'

const isPositive = (type) => type === 'TOP_UP'

const HomePage = () => {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('transactionDate')
  const [order, setOrder] = useState('desc')
  const [time, setTime] = useState('ALL_TIME')
  const [type, setType] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [paginatedTransactions, setPaginatedTransactions] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [transactions, setTransactions] = useState([])
  const [greeting, setGreeting] = useState('Morning')
  const [isVisible, setIsVisible] = useState(false)
  const { user, setUser } = useUserStore()
  const { wallet, setWallet } = useWalletStore()

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      setGreeting(getTimeGreeting())
      try {
        const userData = await fetchUserData(token)
        setUser(userData)

        const wallets = await fetchWalletByUser(userData.id, token)

        let currentWallet
        if (wallets.length === 0) {
          currentWallet = await createWallet(userData.id, userData.email, token)
        } else {
          currentWallet = wallets[0]
        }

        setWallet(currentWallet)

        const transactions = await fetchTransactionHistory({
          walletId: currentWallet.id,
          type,
          time,
          sortBy,
          order,
          token,
          page: page - 1,
          size: itemsPerPage,
        })

        setTransactions(transactions.content)
        setTotalPages(transactions.totalPages)
        setPaginatedTransactions(transactions.content)
      } catch (error) {
        const msg = error.response?.data?.message || 'Something went wrong'
        showAlert(`Oop! ${msg}`, 'OK', () => navigate('/login'))
      }
    }

    init()
  }, [])

  useEffect(() => {
    const getTransactions = async () => {
      if (!wallet) return

      const token = localStorage.getItem('token')
      try {
        const transactions = await fetchTransactionHistory({
          walletId: wallet.id,
          type,
          time,
          sortBy,
          order,
          token,
          page: page - 1,
          size: itemsPerPage,
        })

        setTransactions(transactions.content)
        setPaginatedTransactions(transactions.content)
        setTotalPages(transactions.totalPages)
        // setPaginatedTransactions(
        //   transactions.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        // )
      } catch (error) {
        const msg = error.response?.data?.message || 'Something went wrong'
        showAlert(`Oop! ${msg}`, 'OK', null)
      }
    }

    getTransactions()
  }, [wallet, sortBy, order, time, type, page])

  useEffect(() => {
    const lowercased = search.toLowerCase()
    const filtered = transactions?.filter(
      (t) =>
        t.option?.toLowerCase().includes(lowercased) ||
        t.receiverFullname?.toLowerCase().includes(lowercased) ||
        t.transactionType?.toLowerCase().includes(lowercased) ||
        moment(t.transactionDate)
          .format('D MMMM YYYY HH:mm')
          .toLowerCase()
          .includes(lowercased) ||
        toRupiah(t.amount).toLowerCase().includes(lowercased)
    )
    setPaginatedTransactions(filtered)
  }, [search])

  const handleConfirmLogout = () => {
    navigate('/login')
  }

  const handleTransactionDetail = (data) => {
    navigate('/transaction-success', {
      state: data,
    })
  }

  if (!user && wallet !== null) return <p id='loading'>Loading...</p>

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
              <p
                className='text-lg font-bold'
                id='greeting'
              >{`Good ${greeting}, ${user?.fullname?.split(' ')[0] || '-'}`}</p>
              <p className='text-sm text-gray-600' id='greeting-message'>
                Check all your incoming and outgoing transactions here
              </p>
            </div>
            <img
              id='greeting-logo'
              src={
                greeting === 'Night'
                  ? '/asset/moonface.png'
                  : '/asset/sunface.png'
              }
              alt='modeface'
              className='w-20 mt-2'
            />
          </div>

          {/* Account No */}
          <div className='bg-blue-600 px-4 py-4 rounded-xl mb-4 flex justify-between bg-[#f9f9f9] text-black dark:bg-[#272727] dark:text-white'>
            <p className='text-md' id='account-number-title'>
              Account No.
            </p>
            <p className='text-md' id='account-number'>
              {wallet?.accountNumber || '-'}
            </p>
          </div>

          {/* Balance Card */}
          <div className='flex justify-between items-center relative bg-white px-4 py-4 rounded-xl mb-4 shadow bg-[#f9f9f9] text-black dark:bg-[#272727] dark:text-white'>
            <div>
              <p className='text-sm' id='balance-title'>
                Balance
              </p>
              <div className='flex items-center gap-1'>
                <p className='text-xl font-bold w-40' id='balance'>
                  {isVisible ? toRupiah(wallet?.balance || 0) : 'Rp •••••'}
                </p>
                <img
                  id='visibility'
                  height='15'
                  src={isVisible ? '/asset/visibility.svg' : '/asset/hide.svg'}
                  alt='Visibility'
                  className='w-5 h-5 cursor-pointer'
                  onClick={() => setIsVisible((prev) => !prev)}
                />
              </div>
            </div>

            <div className='right-4 flex flex-col gap-2'>
              <div className='cursor-pointer bg-[#0061FF] shadow-[0px_0px_10px_0px_#19918F] p-2 rounded-md inline-flex items-center justify-center w-10 h-10'>
                <img
                  id='topup-logo'
                  height='20'
                  src='/asset/addicon.png'
                  alt='Add'
                  className='object-cover'
                  onClick={() => navigate('/top-up')}
                />
              </div>
              <div className='cursor-pointer bg-[#0061FF] shadow-[0px_0px_10px_0px_#19918F] p-2 rounded-md inline-flex items-center justify-center w-10 h-10'>
                <img
                  id='transfer-logo'
                  height='20'
                  src='/asset/share.png'
                  alt='Share'
                  className='object-cover'
                  onClick={() => navigate('/transfer')}
                />
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className='p-4 mt-8 rounded-xl shadow-md bg-[#f9f9f9] text-black dark:bg-[#272727] dark:text-white'>
            <p
              className='font-semibold text-base mb-4'
              id='transaction-history-title'
            >
              Transaction History
            </p>
            <hr className='border-t border-gray-300 dark:border-white my-4' />
            <div className='space-y-4'>
              {paginatedTransactions.map((t, index) => (
                <div
                  id={`table-data-${index}`}
                  key={index}
                  className='flex items-start gap-3'
                  onClick={() => handleTransactionDetail(t)}
                >
                  <div className='w-8 h-8 rounded-full bg-gray-300'></div>
                  <div className='flex-1'>
                    <p
                      className='text-sm font-medium'
                      id={`table-data-walledid-${index}`}
                    >
                      {t.option || t.receiverFullname || ''}
                    </p>
                    <p
                      className='text-sm text-gray-500'
                      id={`table-data-type-${index}`}
                    >
                      {t.transactionType === 'TOP_UP' ? 'TOP UP' : 'TRANSFER'}
                    </p>
                    <p
                      className='text-xs text-gray-400'
                      id={`table-data-date-${index}`}
                    >
                      {moment(t.transactionDate).format('HH:mm - D MMMM YYYY')}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      isPositive(t.transactionType)
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                    id={`table-data-amount-${index}`}
                  >
                    {isPositive(t.transactionType) ? '+' : '-'}{' '}
                    {toRupiah(t.amount)}
                  </p>
                </div>
              ))}
            </div>

            <div
              id='pagination'
              className='flex items-center mt-4 w-fit rounded-md'
            >
              <button
                id='pagination-first'
                onClick={() => setPage(1)}
                disabled={page === 1}
                className={`px-3 py-2 font-bold h-[42px] rounded-md transition-colors ${
                  page === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-gray-200'
                }`}
              >
                First
              </button>
              <button
                id='pagination-page'
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-3 py-2 font-bold h-[42px] rounded-md transition-colors ${
                  page === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  id={`pagination-${i}`}
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-2 font-bold h-[42px] rounded-md transition-colors ${
                    page === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-600 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                id='pagination-total'
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className={`px-3 py-2 font-bold h-[42px] rounded-md transition-colors ${
                  page === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-gray-200'
                }`}
              >
                <ChevronRight size={16} />
              </button>
              <button
                id='pagination-next'
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className={`px-3 py-2 font-bold h-[42px] rounded-md transition-colors ${
                  page === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-gray-200'
                }`}
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className='hidden lg:block'>
        <div className='px-10 py-4'>
          <div className='flex justify-between items-center mb-5'>
            <div>
              <p
                className='text-2xl font-bold'
                id='greeting'
              >{`Good ${greeting}, ${user?.fullname?.split(' ')[0]}`}</p>
              <p className='text-sm' id='greeting-message'>
                Check all your incoming and outgoing transactions here
              </p>
            </div>
            <div className='flex items-center gap-4'>
              <div>
                <p className='text-end text-sm font-bold' id='account-name'>
                  {user?.fullname}
                </p>
                <p className='text-end text-xs' id='account-type'>
                  Personal Account
                </p>
              </div>
              <div className='w-12 h-12 border-5 border-blue-600 rounded-full overflow-hidden'>
                <img
                  id='account-avatar'
                  src={user?.avatarUrl || '/asset/avatar.svg'}
                  alt='Profile'
                  className='object-cover w-full h-full'
                />
              </div>
            </div>
          </div>

          <div className='flex justify-between flex-col lg:flex-row gap-4'>
            <div className='bg-blue-600 text-white p-4 lg:p-8 rounded-xl w-full lg:w-1/4'>
              <p className='text-sm' id='account-number-title'>
                Account No.
              </p>
              <p className='text-2xl font-bold' id='account-number'>
                {wallet?.accountNumber}
              </p>
            </div>
            <div className='bg-white w-3/4 p-8 rounded-xl bg-[#f9f9f9] text-black dark:bg-[#272727] dark:text-white'>
              <p className='text-sm' id='balance-title'>
                Balance
              </p>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2.5'>
                  <p className='text-2xl font-bold w-60' id='balance'>
                    {isVisible ? toRupiah(wallet?.balance || 0) : 'Rp •••••'}
                  </p>
                  <img
                    id='visibility'
                    height='15'
                    src={
                      isVisible ? '/asset/visibility.svg' : '/asset/hide.svg'
                    }
                    alt='Visibility'
                    className='cursor-pointer'
                    onClick={() => setIsVisible((prev) => !prev)}
                  />
                </div>
                <div className='flex gap-5'>
                  <div className='cursor-pointer bg-[#0061FF] shadow-[0px_0px_10px_0px_#19918F] p-2 rounded-md inline-flex items-center justify-center w-10 h-10'>
                    <img
                      id='topup-logo'
                      height='20'
                      src='/asset/addicon.png'
                      alt='Add'
                      className='object-cover'
                      onClick={() => navigate('/top-up')}
                    />
                  </div>
                  <div className='cursor-pointer bg-[#0061FF] shadow-[0px_0px_10px_0px_#19918F] p-2 rounded-md inline-flex items-center justify-center w-10 h-10'>
                    <img
                      id='transfer-logo'
                      height='20'
                      src='/asset/share.png'
                      alt='Share'
                      className='object-cover'
                      onClick={() => navigate('/transfer')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 mt-6 rounded-lg shadow-lg  bg-[#f9f9f9] text-black dark:bg-[#272727] dark:text-white'>
            <div className='flex flex-wrap justify-between mb-6'>
              <div
                className='flex items-center border p-2 rounded-lg shadow-sm mb-2'
                style={{
                  border: '1px solid #FFFFFF',
                  boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                }}
              >
                <Search id='search-title' className='mr-2' size={18} />
                <input
                  id='search-filter'
                  className='outline-none border-none bg-transparent text-black dark:bg-[#272727] dark:text-white'
                  placeholder='Search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <label className='text-sm' id='time-title'>
                    Time
                  </label>
                  <select
                    id='time-filter'
                    className='p-2 border rounded-md shadow-sm text-sm'
                    style={{
                      border: '1px solid #FFFFFF',
                      boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                    }}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value='ALL_TIME' id='ALL_TIME'>
                      All
                    </option>
                    <option value='TODAY' id='TODAY'>
                      Today
                    </option>
                    <option value='YESTERDAY' id='YESTERDAY'>
                      Yesterday
                    </option>
                    <option value='THIS_WEEK' id='THIS_WEEK'>
                      Weekly
                    </option>
                    <option value='THIS_MONTH' id='THIS_MONTH'>
                      Monthly
                    </option>
                  </select>
                </div>
                <div className='flex items-center gap-2'>
                  <label className='text-sm' id='type-title'>
                    Type
                  </label>
                  <select
                    id='type-filter'
                    className='p-2 border rounded-md shadow-sm text-sm'
                    style={{
                      border: '1px solid #FFFFFF',
                      boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                    }}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option id='ALL-TYPE' value={null}>
                      All
                    </option>
                    <option id='TOPUP-TYPE' value='TOP_UP'>
                      Top Up
                    </option>
                    <option id='TRANSFER-TYPE' value='TRANSFER'>
                      Transfer
                    </option>
                  </select>
                </div>
                <div className='flex items-center gap-2'>
                  <label className='text-sm' id='pagination-title'>
                    Show
                  </label>
                  <select
                    id='pagination-filter'
                    className='p-2 border rounded-md shadow-sm text-sm'
                    style={{
                      border: '1px solid #FFFFFF',
                      boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                    }}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                  >
                    <option id='5-page' value={5}>
                      Last 5 Transactions
                    </option>
                    <option id='10-page' value={10}>
                      Last 10 Transactions
                    </option>
                    <option id='20-page' value={20}>
                      Last 20 Transactions
                    </option>
                  </select>
                </div>
                <div className='flex items-center gap-2'>
                  <label className='text-sm' id='sort-title'>
                    Sort By
                  </label>
                  <select
                    id='sort-filter'
                    className='p-2 border rounded-md shadow-sm text-sm'
                    style={{
                      border: '1px solid #FFFFFF',
                      boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                    }}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option id='sort-date' value='transactionDate'>
                      Date
                    </option>
                    <option id='sort-amount' value='amount'>
                      Amount
                    </option>
                    <option id='sort-description' value='description'>
                      Description
                    </option>
                  </select>
                  <select
                    id='sort-char-filter'
                    className='p-2 border rounded-md shadow-sm text-sm'
                    style={{
                      border: '1px solid #FFFFFF',
                      boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                    }}
                    onChange={(e) => setOrder(e.target.value)}
                  >
                    <option id='sort-asc' value='desc'>
                      Descending
                    </option>
                    <option id='sort-desc' value='asc'>
                      Ascending
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table with updated styling */}
            <table id='transaction-table' className='table'>
              <thead>
                <tr>
                  <th id='table-title-1' className='px-4 py-2 text-left'>
                    Date & Time
                  </th>
                  <th id='table-title-2' className='px-4 py-2 text-left'>
                    Type
                  </th>
                  <th id='table-title-3' className='px-4 py-2 text-left'>
                    From / To
                  </th>
                  <th id='table-title-4' className='px-4 py-2 text-left'>
                    Description
                  </th>
                  <th id='table-title-5' className='px-4 py-2 text-left'>
                    Amount
                  </th>
                  <th id='table-title-6' className='px-4 py-2 text-left'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((t, index) => (
                  <tr
                    id={`data-table-${index}`}
                    key={index}
                    className={index % 2 === 0 ? 'dark:text-black' : 'unset'}
                  >
                    <td className='px-4 py-2' id={`table-data-date-${index}`}>
                      {moment(t.transactionDate).format('HH:mm - D MMMM YYYY')}
                    </td>
                    <td className='px-4 py-2' id={`table-data-type-${index}`}>
                      {t.transactionType === 'TOP_UP' ? 'TOP UP' : 'TRANSFER'}
                    </td>
                    <td
                      className='px-4 py-2'
                      id={`table-data-walledid-${index}`}
                    >
                      {t.option || t.receiverFullname || ''}
                    </td>
                    <td
                      className='px-4 py-2'
                      id={`table-data-description-${index}`}
                    >
                      {t.description || '-'}
                    </td>
                    <td
                      className={`px-4 py-2 ${
                        isPositive(t.transactionType)
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                      id={`table-data-amount-${index}`}
                    >
                      {isPositive(t.transactionType) ? '+' : '-'}{' '}
                      {toRupiah(t.amount)}
                    </td>
                    <td>
                      <LinkText
                        id={`table-link-detail-${index}`}
                        text='Details'
                        onClick={() => handleTransactionDetail(t)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              id='pagination'
              className='flex items-center mt-4 w-fit rounded-md'
            >
              <button
                id='pagination-first'
                onClick={() => setPage(1)}
                disabled={page === 1}
                className={`px-3 py-2 font-bold h-[42px] rounded-md transition-colors ${
                  page === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-gray-200'
                }`}
              >
                First
              </button>
              <button
                id='pagination-page'
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-3 py-2 font-bold h-[42px] rounded-md transition-colors ${
                  page === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  id={`pagination-${i}`}
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-2 font-bold h-[42px] rounded-md transition-colors ${
                    page === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-600 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                id='pagination-total'
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className={`px-3 py-2 font-bold h-[42px] rounded-md transition-colors ${
                  page === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-gray-200'
                }`}
              >
                <ChevronRight size={16} />
              </button>
              <button
                id='pagination-next'
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className={`px-3 py-2 font-bold h-[42px] rounded-md transition-colors ${
                  page === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-gray-200'
                }`}
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage
