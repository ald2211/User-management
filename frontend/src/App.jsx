import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Header from './components/Header'
import {PrivateRoute,LoginPrivateRoute} from './components/PrivateRoute'
import Users from './pages/Users'
import { OnlyAdmin } from './components/OnlyAdminPrivateRoute'
const App = () => {
  return (
    <>
    <Header />
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route element={<LoginPrivateRoute />}>
      <Route path="/auth" element={<Login />} />
      </Route>
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<OnlyAdmin/>}>
      <Route path='/users' element={<Users />}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
