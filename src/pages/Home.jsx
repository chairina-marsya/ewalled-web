import React, { useState } from 'react'

import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

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
  {
    date: '20:10 - 30 June 2022',
    type: 'Transfer',
    from: 'Spongebob',
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
  {
    date: '20:10 - 30 June 2022',
    type: 'Transfer',
    from: 'Anwar',
    description: 'Beli barang',
    amount: -75000,
  },
  {
    date: '20:10 - 30 June 2022',
    type: 'Transfer',
    from: 'Joko',
    description: 'Transfer',
    amount: 1000000,
  },
  {
    date: '20:10 - 30 June 2022',
    type: 'Transfer',
    from: 'Joko',
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
  {
    date: '20:10 - 30 June 2022',
    type: 'Transfer',
    from: 'Joko',
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
    <>
      <div className='container-a'>
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
            <p className='amount-num'>100899</p>
          </div>
          <div className='act_num account-balance'>
            <div>
              <p>Balance</p>
              <div className='profile-balance'>
                <div className='profile-amount'>
                  <p className='amount-num'>Rp 10.000.000,00</p>
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
        <div className='container-table'>
          <div className='controls'>
            <div className='search-box'>
              <Search className='search-icon' size={18} />
              <input
                className='search-input'
                placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div
              style={{
                display: 'flex',
                aligItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: '0.5rem',
              }}
            >
              <label>
                Show
                <select
                  className='dropdown'
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value='5'>Show 5 Transactions</option>
                  <option value='10'>Show 10 Transactions</option>
                  <option value='20'>Show 20 Transactions</option>
                </select>
              </label>
              <div>
                <label>
                  Sort By
                  <select
                    className='dropdown'
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                  </select>
                </label>
                <select
                  className='dropdown'
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <option value='asc'>Ascending</option>
                  <option value='desc'>Descending</option>
                </select>
              </div>
            </div>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Type</th>
                <th>From / To</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((t, index) => (
                <tr key={index}>
                  <td>{t.date}</td>
                  <td>{t.type}</td>
                  <td>{t.from}</td>
                  <td>{t.description}</td>
                  <td
                    className={
                      t.amount > 0 ? 'amount-positive' : 'amount-negative'
                    }
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
              className='pagination-button'
            >
              First
            </button>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className='pagination-button'
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
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className='pagination-button'
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className='pagination-button'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
