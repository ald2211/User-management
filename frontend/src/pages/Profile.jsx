import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import profile from '../assets/profile.png'
import { updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserSuccess,deleteUserStart,signOutUserFailure,signOutUserStart,signOutUserSuccess } from '../Redux/Reducer/UserSlice'

const Profile = () => {
  const {currentUser,loading,error}=useSelector((state)=>state.user)
  const fileRef=useRef(null)
  const [file,setFile]=useState(undefined)
  const [dataFromForm,setFormData]=useState({})
  const imgRef=useRef(null)
  const dispatch=useDispatch()
  const [updateSuccess,setUpdateSuccess]=useState(false)
  const handleChange=(e)=>{
    if (e.target.type === 'file') {
      setFile(e.target.files[0]);
    } else {
      setFormData({ ...dataFromForm, [e.target.id]: e.target.value });
    }
  }
  if(updateSuccess){
    setTimeout(() => {
      setUpdateSuccess(false)
    }, 5000);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{

      dispatch(updateUserStart())
      const formData = new FormData();
      if(file){
        formData.append('avatar', file); // Append image file
      }
      for (const key in dataFromForm) {
        formData.append(key, dataFromForm[key]);
      }

      const res=await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`,{
         
            method:'POST',
           
            body:formData,
            credentials: 'include'
      })
      const data=await res.json()
      if(data.success===false){
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    }catch(error){
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser=async()=>{

    try{
      dispatch(deleteUserStart())
      const res=await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
        credentials: 'include'
      })
      const data=res.json()
      if(data.success===false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    }catch(error){
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOutUser=async(req,res)=>{
    try{
      dispatch(signOutUserStart())
      const res=await fetch('http://localhost:3000/api/auth/signout')
      const data=await res.json()
      if(data.success===false){
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess(data))
    }catch(error){
      dispatch(signOutUserFailure(error.message))
    }
  }
  useEffect(()=>{
    if(file){
      
      imgRef.current.src=URL.createObjectURL(file)
      
    }
   
  },[file])
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl font-semibold text-center my-2'>profile</h1>
      <p className='text-red-700 text-center'>{error?error:''}</p>
      <p className='text-green-700 text-center'>{updateSuccess?'user updated successfully':''}</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3' >
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={()=>fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center ' src={currentUser.avatar ? `http://localhost:3000/uploads/${currentUser.avatar}` : profile} ref={imgRef} alt="" />
        <input onChange={handleChange} type="text" placeholder='username' className='border p-2 rounded-lg' id='username' defaultValue={currentUser.username} />
        <input onChange={handleChange} type="text" placeholder='number' className='border p-2 rounded-lg' id='number' defaultValue={currentUser.number} />
        <input onChange={handleChange} type="email" placeholder='email' className='border p-2 rounded-lg' id='email' defaultValue={currentUser.email}/>
        <input onChange={handleChange} type="text" placeholder='password' className='border p-2 rounded-lg' id='password' />
        <button type='submit'  className='bg-slate-800 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-1'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer hover:text-red-400'>Delete Account</span>
        <span onClick={handleSignOutUser} className='text-red-700 cursor-pointer  hover:text-red-400'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
