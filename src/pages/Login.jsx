import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    // Dummy authentication (bisa diganti dengan API backend)
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true)
      navigate('/') // Redirect ke dashboard setelah login
    } else {
      alert('Invalid username or password!')
    }
  }

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
