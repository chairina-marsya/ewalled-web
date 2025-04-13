import axios from 'axios'
import { BASE_URL } from '../utils/general'

export const createTransferTransaction = async (
  walletId,
  receiver,
  amount,
  description
) => {
  const token = localStorage.getItem('token')
  const url = `${BASE_URL}/api/transactions`

  const data = {
    walletId,
    transactionType: 'TRANSFER',
    amount,
    recipientAccountNumber: receiver.accountNumber,
    description,
    option: '',
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const response = await axios.post(url, data, { headers })
  return response.data.data
}

export const createTopUpTransaction = async (
  walletId,
  amount,
  description,
  selectedReceiver
) => {
  const token = localStorage.getItem('token')
  const url = `${BASE_URL}/api/transactions`

  const data = {
    walletId,
    transactionType: 'TOP_UP',
    amount,
    recipientAccountNumber: '',
    description,
    option: selectedReceiver,
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const response = await axios.post(url, data, { headers })
  return response.data.data
}

export const getTransactionById = async (transactionId, token) => {
  const url = `${BASE_URL}/api/transactions/${transactionId}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await axios.get(url, { headers })
    return response.data.data
  } catch (error) {
    throw new Error(error.response.data.message || 'Error fetching transaction')
  }
}

export const downloadTransactionReceipt = async (transactionId, token) => {
  const baseUrl = `${BASE_URL}/api/transactions`

  const url = `${baseUrl}/export-pdf/${transactionId}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await axios.get(url, {
      headers,
      responseType: 'blob', // crucial for downloading binary data
    })

    const blob = new Blob([response.data], { type: 'application/pdf' })
    return blob
  } catch (error) {
    throw new Error(error.response.data.message || 'Error downloading receipt')
  }
}
