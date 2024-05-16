import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {

  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='w-full min-h-screen flex justify-center items-center flex-col bg-gradient-to-b from-blue-200 to-blue-300'>
      <div className='max-w-xl px-6 py-12 bg-white rounded-lg shadow-lg'>
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>
          Welcome to Our  {currentUser?'Home Page!':'WebSite'}
        </h1>
        <p className='text-lg text-gray-700 mb-8'>
          We're delighted to have you here. Explore and discover what we have to offer!
        </p>
        <div className='flex justify-center'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300'>
            Get Started
          </button>
        </div>
      </div>
      <div className='mt-8 text-gray-800 text-sm'>
        All rights reserved
      </div>
    </div>
  );
}

export default Home
