import axios from 'axios'
import { getDateRange } from '../utils/functions'
import { BASE_URL } from '../utils/general'

export const fetchUserData = async (token) => {
  const response = await axios.get(`${BASE_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data
}

export const fetchWalletByUser = async (userId, token) => {
  const response = await axios.get(`${BASE_URL}/api/wallets/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data
}

export const createWallet = async (userId, email, token) => {
  const response = await axios.post(
    `${BASE_URL}/api/wallets/${userId}`,
    { email },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data.data
}

export const fetchTransactionHistory = async ({
  walletId,
  type,
  time,
  sortBy,
  order,
  token,
  page,
  size,
}) => {
  const reqType = type === 'All' ? null : type
  const response = await axios.get(`${BASE_URL}/api/transactions/filter`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      walletId,
      type: reqType,
      timeRange: time,
      startDate: getDateRange(time).startDate,
      endDate: getDateRange(time).endDate,
      sortBy,
      order,
      page,
      size,
    },
  })
  return response.data.data
}
