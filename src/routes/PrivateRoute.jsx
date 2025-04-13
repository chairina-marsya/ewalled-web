import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  // If not authenticated, redirect to login
  if (!isAuthenticated && !localStorage.getItem('token')) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default PrivateRoute
