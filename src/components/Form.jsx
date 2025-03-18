import { useState } from 'react'

function Form(params) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleUsernameChange(e) {
    setUsername(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleLogin() {
    if (username === 'admin' && password === 'admin') {
      alert('Berhasil Login!')
    } else {
      alert('Username atau Password salah')
    }
  }

  return (
    <div>
      <p>Username : {username}</p>
      <p>Password : {password}</p>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => handleUsernameChange(e)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => handlePasswordChange(e)}
      />
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  )
}

export default Form
