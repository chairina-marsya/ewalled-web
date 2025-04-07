import { useState } from 'react'
import { ChevronDown, ChevronUp, Share2, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TransactionSuccessCard() {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

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
          <p className='font-semibold'>Transaction Success</p>
          <p className='text-sm'>30 Jun 2022 - 20:10</p>
        </div>
      </div>

      {/* Card content */}
      <div className='max-w-md mx-auto'>
        <div className='border shadow-xl border-gray-700 p-4 bg-white rounded-sm dark:bg-[#272727] dark:text-white'>
          <div className='flex justify-between mb-1'>
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              Amount
            </div>
            <div className='font-bold text-right'>Rp 75.000</div>
          </div>
          <hr className='mb-2' />

          <div className='flex justify-between mb-1'>
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              Recipient
            </div>
            <div className='flex flex-col items-end'>
              <div className='font-semibold'>Fore Coffee</div>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                112233445566
              </div>
            </div>
          </div>
          <hr className='mb-2' />

          {/* Expand/Collapse */}
          {expanded ? (
            <>
              <div className='flex justify-between mb-1'>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  Sender
                </div>
                <div className='flex flex-col items-end'>
                  <div className='font-semibold'>Chelsea Immanuela</div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    998877665544
                  </div>
                </div>
              </div>
              <hr className='mb-2' />

              <div className='flex justify-between mb-1'>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  Transaction Id
                </div>
                <div className='text-right'>F46287DH</div>
              </div>
              <hr className='mb-2' />

              <div className='flex justify-between mb-1'>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  Notes
                </div>
                <div className='text-right'>ngopi santuy</div>
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
                <span>Rp 75.000</span>
              </div>
            </>
          ) : null}

          <button
            onClick={() => setExpanded(!expanded)}
            className='w-full flex justify-between items-center text-left mt-2 text-black dark:text-white font-medium'
          >
            Detail Transaction
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
        {/* Action buttons */}
        <div className='flex items-center justify-between mt-10'>
          <div className='flex space-x-4'>
            <button className='bg-[#0061FF1A] text-white p-2 rounded-full'>
              <Share2 size={20} />
            </button>
            <button className='bg-[#0061FF1A] text-white p-2 rounded-full'>
              <Download size={20} />
            </button>
          </div>
          <button
            className='bg-[#0061FF] text-white px-30 py-2 rounded-md font-semibold'
            onClick={() => navigate('/')}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
