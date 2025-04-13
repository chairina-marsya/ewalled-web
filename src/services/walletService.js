import axios from 'axios'
import { BASE_URL } from '../utils/general'

export const fetchWallets = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${BASE_URL}/api/wallets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}
