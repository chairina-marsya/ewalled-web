import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/general'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const login = async (email, password, showAlert) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )

      localStorage.setItem('token', response.data.data.token)
      setIsAuthenticated(true)

      showAlert(`Welcome back! ${response.data.message}`, 'OK', () =>
        navigate('/')
      )

      return { success: true }
    } catch (error) {
      // ⛔ Check for 401 Unauthorized
      if (error.response?.status === 401) {
        showAlert('Unauthorized. Please login again.', 'OK', logout)
        return { success: false, message: 'Unauthorized' }
      }

      return {
        success: false,
        message: error.response?.data?.message || error.message,
      }
    }
  }

  // Inside AuthProvider
  const register = async (data, showAlert) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        {
          email: data.email,
          username: data.email,
          fullname: data.fullname,
          password: data.password,
          phoneNumber: data.phone,
          avatarUrl: data.avatarUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      showAlert(`Congratulations! ${response.data.message}.`, 'OK', () =>
        navigate('/login')
      )

      return { success: true }
    } catch (error) {
      // Handle 401 as before
      if (error.response?.status === 401) {
        showAlert('Unauthorized. Please login again.', 'OK', logout)
        return { success: false, message: 'Unauthorized' }
      }

      return {
        success: false,
        message: error.response?.data?.message || error.message,
      }
    }
  }

  const logout = async () => {
    const token = localStorage.getItem('token')
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.clear()
      window.location.href = '/login'
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
