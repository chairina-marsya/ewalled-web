import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useNavigate } from 'react-router-dom'
import { useWalletStore } from '../../store/walletStore'
import axios from 'axios'
import { showAlert } from '../components/organisms/ShowAlert'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const dummyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
const dummyData = {
  labels: dummyLabels,
  datasets: [
    {
      label: 'Income',
      data: [4000, 3000, 2000, 2780, 1890],
      backgroundColor: '#0061FF', // Tailwind green-400
      borderRadius: 7,
    },
    {
      label: 'Outcame',
      data: [2400, 1398, 9800, 3908, 4800],
      backgroundColor: '#D4D4D4', // Tailwind red-400
      borderRadius: 7,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
}

export default function SummaryPage() {
  const navigate = useNavigate()
  const { wallet } = useWalletStore()
  const [filter, setFilter] = useState('monthly')
  const [month, setMonth] = useState('1')
  const [year, setYear] = useState(2025)
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalOutcome, setTotalOutcome] = useState(0)
  // const [labels, setLabels] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || token === null || token === undefined) {
      showAlert(
        `Sesi anda habis. Silahkan login kembali.`,
        'OK',
        handleConfirmLogout
      )
    } else {
      getWalletSummary()
      getTransactionGraph()
    }
  }, [])

  useEffect(() => {
    getTransactionGraph()
  }, [filter, month])

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

  const getWalletSummary = () => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:8080/api/transactions/summary/${wallet.id}`

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    axios
      .get(url, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data
        setTotalBalance(data.balance)
        setTotalIncome(data.totalIncome)
        setTotalOutcome(data.totalOutcome)
      })
      .catch((error) => {
        showAlert(`Oop! ${error.message}`, 'OK', null)
      })
  }

  const getTransactionGraph = (id) => {
    const token = localStorage.getItem('token')
    const url = 'http://localhost:8080/api/transactions/graph'

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    const data = {
      view: filter,
      month: filter === 'weekly' ? month : null,
      year: year,
      walletId: wallet.id,
    }

    axios
      .post(url, data, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data
        const labelsMap = data.data.map((item) => item.label)
        const incomeMap = data.data.map((item) => item.income)
        const outcomeMap = data.data.map((item) => item.outcome)
        console.log(labelsMap, incomeMap, outcomeMap)
        const graphData = {
          labels: labelsMap,
          datasets: [
            {
              label: 'Income',
              data: incomeMap,
              backgroundColor: '#0061FF',
              borderRadius: 7,
            },
            {
              label: 'Outcame',
              data: outcomeMap,
              backgroundColor: '#D4D4D4',
              borderRadius: 7,
            },
          ],
        }
        setData(graphData)
      })
      .catch((error) => {
        showAlert(`Oop! ${error.message}`, 'OK', null)
      })
  }

  return (
    <div className='px-10 py-4 space-y-8 min-h-screen bg-[#f9f9f9] text-black dark:bg-black dark:text-white'>
      {/* SECTION 1: Balance Cards */}
      <div>
        <h2 className='text-xl font-semibold mb-4' id='balance-page-title'>
          Balance Overview
        </h2>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 bg-white shadow-md rounded-lg p-4'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 overflow-hidden'>
                <img
                  id='account-income'
                  src={'/asset/income.svg'}
                  alt='Profile'
                  className='object-cover w-full h-full'
                />
              </div>
              <p className='text-gray-500' id='account-income-label'>
                Income
              </p>
            </div>
            <h2
              className='text-black text-xl font-bold mt-4'
              id='account-income'
            >
              {toRupiah(totalIncome)}
            </h2>
          </div>
          <div className='flex-1 bg-white shadow-md rounded-lg p-4'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 overflow-hidden'>
                <img
                  id='account-outcome'
                  src={'/asset/outcome.svg'}
                  alt='Profile'
                  className='object-cover w-full h-full'
                />
              </div>
              <p className='text-gray-500' id='account-outcome-label'>
                Outcome
              </p>
            </div>
            <h2
              className='text-black text-xl font-bold mt-4'
              id='account-outcome'
            >
              {toRupiah(totalOutcome)}
            </h2>
          </div>
          <div className='flex-1 bg-[#0061FF] shadow-md rounded-lg p-4'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 overflow-hidden'>
                <img
                  id='account-balance'
                  src={'/asset/total_balance.svg'}
                  alt='Profile'
                  className='object-cover w-full h-full'
                />
              </div>
              <p className='text-white' id='account-balance-label'>
                Total Balance
              </p>
            </div>
            <h2
              className='text-white text-xl font-bold mt-4'
              id='account-balance'
            >
              {toRupiah(totalBalance)}
            </h2>
          </div>
        </div>
      </div>

      {/* SECTION 2: Chart and Filters */}
      <div className='bg-white shadow-md rounded-lg p-4 w-full'>
        {/* Row 1: Title and Buttons */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4'>
          <h2 className='text-black text-xl font-semibold' id='balance-graph'>
            Balance Graph
          </h2>
          <div className='flex rounded-md bg-[#D4D4D4] text-gray-700'>
            {['quartal', 'monthly', 'weekly'].map((option) => (
              <button
                id='period-filter'
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === option
                    ? 'bg-[#0061FF] text-white'
                    : 'bg-[#D4D4D4] text-gray-700'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Dropdown and Color Indicators */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4'>
          {/* Indicator Legend */}
          <div className='flex gap-4'>
            <div className='flex items-center gap-2'>
              <span className='w-4 h-4 rounded-full bg-[#0061FF]'></span>
              <span className='text-sm text-gray-700'>Income</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-4 h-4 rounded-full bg-[#D4D4D4]'></span>
              <span className='text-sm text-gray-700'>Outcame</span>
            </div>
          </div>
          {/* Dropdown */}
          <div>
            {filter === 'weekly' ? (
              <>
                <label
                  className='text-sm mr-2 text-gray-700'
                  id='month-filter-title'
                >
                  Month
                </label>
                <select
                  id='month-filter'
                  className='p-2 border rounded-md shadow-sm text-sm text-gray-700'
                  style={{
                    border: '1px solid #FFFFFF',
                    boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                  }}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option id='sort-1' value='1'>
                    Jan
                  </option>
                  <option id='sort-2' value='2'>
                    Feb
                  </option>
                  <option id='sort-3' value='3'>
                    Mar
                  </option>
                  <option id='sort-4' value='4'>
                    Apr
                  </option>
                  <option id='sort-5' value='5'>
                    May
                  </option>
                  <option id='sort-6' value='6'>
                    Jun
                  </option>
                  <option id='sort-7' value='7'>
                    Jul
                  </option>
                  <option id='sort-8' value='8'>
                    Agt
                  </option>
                  <option id='sort-9' value='9'>
                    Sep
                  </option>
                  <option id='sort-10' value='10'>
                    Oct
                  </option>
                  <option id='sort-11' value='11'>
                    Nov
                  </option>
                  <option id='sort-12' value='12'>
                    Des
                  </option>
                </select>
              </>
            ) : (
              <>
                <label className='text-sm mr-2' id='year-filter-title'>
                  Year
                </label>
                <select
                  id='sort-filter'
                  className='p-2 border rounded-md shadow-sm text-sm'
                  style={{
                    border: '1px solid #FFFFFF',
                    boxShadow: '0px 0px 10px 0px #5B5B5B1A',
                  }}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option id='year-2025' value='2025'>
                    2025
                  </option>
                  <option id='year-2026' value='2026'>
                    2026
                  </option>
                </select>
              </>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        {data && data?.labels && (
          <div>
            <Bar data={data} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  )
}
