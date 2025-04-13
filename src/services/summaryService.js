// src/services/summaryService.js
import axios from 'axios'
import { BASE_URL } from '../utils/general'

export const getWalletSummary = async (walletId, token) => {
  try {
    const url = `${BASE_URL}/api/transactions/summary/${walletId}`
    const headers = { Authorization: `Bearer ${token}` }

    const response = await axios.get(url, { headers })
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const getTransactionGraph = async ({
  view,
  month,
  year,
  walletId,
  token,
}) => {
  try {
    const url = `${BASE_URL}/api/transactions/graph`
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    const payload = {
      view,
      month: view === 'weekly' ? month : null,
      year,
      walletId,
    }

    const response = await axios.post(url, payload, { headers })
    return response.data.data
  } catch (error) {
    throw error
  }
}
