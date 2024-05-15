import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet ,Navigate} from 'react-router-dom'

export const PrivateRoute = () => {

    const {currentUser}=useSelector((state)=>state.user)
  return currentUser ? <Outlet />:<Navigate to='/auth' />
}

export const LoginPrivateRoute=()=>{
    const {currentUser}=useSelector((state)=>state.user)
    return currentUser ?<Navigate to="/" />:<Outlet />
}

