import { useEffect, useState } from 'react'
import axios from 'axios'
import { ChevronDown, ChevronUp, Share2, Download } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment'
import { showAlert } from '../components/organisms/ShowAlert'

export default function TransactionSuccessCard() {
  const [expanded, setExpanded] = useState(false)
  const [dataTrans, setDataTrans] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state || {}

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || token === null || token === undefined) {
      showAlert(
        `Sesi anda habis. Silahkan login kembali.`,
        'OK',
        handleConfirmLogout
      )
    } else {
      const fetchTransData = async () => {
        try {
          const transactionId = data.id
          const url = `https://kel-1-rakamin-walled-server.onrender.com/api/transactions/${transactionId}`

          const headers = {
            Authorization: `Bearer ${token}`,
          }

          axios
            .get(url, { headers })
            .then((response) => {
              setDataTrans(response.data.data)
            })
            .catch((error) => {
              const inline = error.response.data.message
              console.error('Error:', error)
              showAlert(`Oop! ${inline}`, 'OK', null)
            })
        } catch (error) {
          const inline = error.response.data.message
          console.error('Error:', error)
          showAlert(`Oop! ${inline}`, 'OK', null)
        }
      }

      fetchTransData()
    }
  }, [])

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

  const onDownloadReceipt = () => {
    const token = localStorage.getItem('token')
    const url = `https://kel-1-rakamin-walled-server.onrender.com/api/transactions/export-pdf/${dataTrans.id}`
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    axios
      .get(url, {
        headers,
        responseType: 'blob', // ✅ this is the crucial part
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' }) // ✅ set correct type
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `transactions-${dataTrans.id}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.remove() // 🧼 clean up
        setTimeout(() => window.URL.revokeObjectURL(url), 100) // optional cleanup

        showAlert('Downloaded', 'OK', null)
      })
      .catch((error) => {
        console.error('Error:', error)
        showAlert(`Oop! ${error.message}`, 'OK', null)
      })
  }

  return (
    <div className='w-full h-[90vh] p-4 space-y-4 bg-[#FAFBFD] text-black dark:bg-black dark:text-white'>
      {/* Check icon */}
      <div className='flex justify-center gap-2'>
        <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center'>
          <svg
            className='w-6 h-6 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={3}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
        <div>
          <p className='font-semibold' id='transaction-success-title'>
            Transaction Success
          </p>
          <p className='text-sm' id='transaction-success-time'>
            {moment(dataTrans.transactionDate).format('HH:mm - D MMMM YYYY')}
          </p>
        </div>
      </div>

      {/* Card content */}
      <div className='max-w-md mx-auto'>
        <div className='border shadow-xl border-gray-700 p-4 bg-white rounded-sm dark:bg-[#272727] dark:text-white'>
          <div className='flex justify-between mb-1'>
            <div
              className='text-sm text-gray-500 dark:text-gray-400'
              id='transaction-amount-title'
            >
              Amount
            </div>
            <div className='font-bold text-right' id='transaction-amount'>
              {toRupiah(dataTrans.amount ?? 0)}
            </div>
          </div>
          <hr className='mb-2' />

          {dataTrans && dataTrans.transactionType == 'TOP_UP' ? (
            <>
              <div className='flex justify-between mb-1'>
                <div
                  className='text-sm text-gray-500 dark:text-gray-400'
                  id='transaction-from-title'
                >
                  From
                </div>
                <div className='flex flex-col items-end'>
                  <div className='font-semibold' id='transaction-from'>
                    {dataTrans.option}
                  </div>
                  {/* <div className='text-sm text-gray-500 dark:text-gray-400'>
                112233445566
              </div> */}
                </div>
              </div>
              <hr className='mb-2' />
            </>
          ) : (
            <>
              <div className='flex justify-between mb-1'>
                <div
                  className='text-sm text-gray-500 dark:text-gray-400'
                  id='transaction-receipient-title'
                >
                  Recipient
                </div>
                <div className='flex flex-col items-end'>
                  <div
                    className='font-semibold'
                    id='transaction-receipient-number'
                  >
                    {dataTrans.receiverFullname}
                  </div>
                  <div
                    className='text-sm text-gray-500 dark:text-gray-400'
                    id='transaction-receipient-name'
                  >
                    {dataTrans.receiverAccountNumber}
                  </div>
                </div>
              </div>
              <hr className='mb-2' />
              <div className='flex justify-between mb-1'>
                <div
                  className='text-sm text-gray-500 dark:text-gray-400'
                  id='transaction-sender-title'
                >
                  Sender
                </div>
                <div className='flex flex-col items-end'>
                  <div className='font-semibold' id='transaction-sender-name'>
                    {dataTrans.senderFullname}
                  </div>
                  <div
                    className='text-sm text-gray-500 dark:text-gray-400'
                    id='transaction-sender-number'
                  >
                    {dataTrans.senderAccountNumber}
                  </div>
                </div>
              </div>
              <hr className='mb-2' />
            </>
          )}

          {/* Expand/Collapse */}
          {expanded ? (
            <>
              {/* <div className='flex justify-between mb-1'>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  Sender
                </div>
                <div className='flex flex-col items-end'>
                  <div className='font-semibold'>{dataTrans.option}</div>
                   <div className='text-sm text-gray-500 dark:text-gray-400'>
                    998877665544
                  </div>
                </div>
              </div>
              <hr className='mb-2' /> */}

              <div className='flex justify-between mb-1'>
                <div
                  className='text-sm text-gray-500 dark:text-gray-400'
                  id='transaction-id-title'
                >
                  Transaction Id
                </div>
                <div className='text-right' id='transaction-id'>
                  {dataTrans.id}
                </div>
              </div>
              <hr className='mb-2' />

              <div className='flex justify-between mb-1'>
                <div
                  className='text-sm text-gray-500 dark:text-gray-400'
                  id='transaction-notes-title'
                >
                  Notes
                </div>
                <div className='text-right' id='transaction-notes'>
                  {dataTrans.description}
                </div>
              </div>
              <hr className='mb-2' />

              <div className='flex justify-between mb-1'>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  Admin Fee
                </div>
                <div className='text-right'>Rp 0</div>
              </div>

              <div className='font-bold flex justify-between border-t pt-2'>
                <span>Total</span>
                <span>{toRupiah(dataTrans.amount ?? 0)}</span>
              </div>
            </>
          ) : null}

          <button
            onClick={() => setExpanded(!expanded)}
            className='w-full flex justify-between items-center text-left mt-2 text-black dark:text-white font-small'
            id='transaction-expand'
          >
            Detail Transaction
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
        {/* Action buttons */}
        <div className='flex items-center justify-between mt-10'>
          <div className='flex space-x-4'>
            <button
              id='download-button'
              className='bg-[#0061FF1A] text-white p-2 rounded-full cursor-pointer'
              onClick={() => onDownloadReceipt()}
            >
              <Download size={20} />
            </button>
          </div>
          <button
            id='done-button'
            className='bg-[#0061FF] text-white px-30 py-2 rounded-md font-semibold cursor-pointer'
            onClick={() => navigate('/')}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
