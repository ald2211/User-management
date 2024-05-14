import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center  p-3'>

     <Link to='/'>
     <h1 className='font-bold text-sm sm:text-xl flex flex-wrap pl-10'>
        <span className='text-slate-700'>ToDo</span>
        <span className='text-slate-500'>App</span>
      </h1>
      </Link>

      <ul className='flex gap-4 mr-3 pr-14'>
     <Link to='/'> <li className='sm:inline text-slate-800 hover:text-red-600'>Home</li> </Link>
     <Link to='/auth'> <li className='sm:inline text-slate-800 hover:text-red-600'>Sign In</li> </Link>
      </ul>
        </div>
    </header>
  )
}

export default Header
