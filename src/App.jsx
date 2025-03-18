import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import LoginPage from './pages/Login'
import NoFoundPage from './pages/NotFound'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <HomePage />
    // <Card>
    //   <Message fontFamiliy='Open Sans' />
    //   <p>Mari Bermaiin!</p>
    //   <Game />
    //   <Form />
    // </Card>
    // <div>
    //   <nav>
    //     <Link to='/'>Home</Link> | <Link to='/about'>About</Link> |{' '}
    //     <Link to='/login'>Login</Link>
    //   </nav>
    //   <Routes>
    //     <Route path='/' element={<HomePage />} />
    //     <Route path='/about' element={<AboutPage />} />
    //     <Route path='/login' element={<LoginPage />} />
    //     <Route path='*' element={<NoFoundPage />} />
    //   </Routes>
    // </div>
  )
}

export default App
