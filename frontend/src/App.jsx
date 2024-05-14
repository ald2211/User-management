import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Header from './components/Header'
const App = () => {
  return (
    <>
    <Header />
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      
    </Routes>
    </>
  )
}

export default App
