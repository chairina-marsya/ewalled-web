import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginBox from '../components/organisms/LoginBox'
import RegisterBox from '../components/organisms/RegisterBox'

const RegisterPage = ({ setIsAuthenticated }) => {
  // Accept setIsAuthenticated as a prop
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const registerUser = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/register', {
          email: "john.doe@mail.com",
          username: "johndoemail",
          fullname: "John Doe Mail",
          password: "password123",
          phoneNumber: "12313123"
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        console.log('Registration Successful:', response.data);
      } catch (error) {
        console.error('Registration Failed:', error.response ? error.response.data : error.message);
      }
    };
    
    // Call the function
    registerUser();
  }, [])
  

  const handleLogin = (e) => {
    e.preventDefault()

    if (email === 'admin' && password === 'admin') {
      setIsAuthenticated(true) // Set the authentication state to true
      navigate('/') // Redirect to homepage (Dashboard) after successful login
    } else {
      setError('Username atau password salah') // Show error if login fails
    }
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left Section - Login Form */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-6 bg-white'>
        <RegisterBox
          email={email}
          password={password}
          phone={phone}
          fullName={name}
          onNameChange={(e) => setName(e.target.value)}
          onPhoneChange={(e) => setPhone(e.target.value)}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleLogin}
          error={error}
        />
      </div>

      {/* Right Section - Image */}
      <div
        className='hidden md:block w-1/2 bg-cover bg-center'
        style={{ backgroundImage: "url('/asset/loginbg.png')" }}
      ></div>
    </div>
  )
}

export default RegisterPage
