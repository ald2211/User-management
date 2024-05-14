import React from 'react'
import { useSelector } from 'react-redux'
import profile from '../assets/profile.png'

const Profile = () => {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl font-semibold text-center my-7'>profile</h1>
      <form className='flex flex-col gap-4' >
        <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={currentUser.avatar||profile} alt="" />
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' />
        <input type="text" placeholder='number' className='border p-3 rounded-lg' id='username' />
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='username' />
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='username' />
        <button className='bg-slate-800 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-2'>
        <span className='text-red-700 cursor-pointer hover:text-red-400'>Delete Account</span>
        <span className='text-red-700 cursor-pointer  hover:text-red-400'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
