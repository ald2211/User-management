import React, { useRef, useState } from "react";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [signInState, setSignInState] = useState("Sign In");
  const [formData,setFormData]=useState({})
  const emailRef=useRef()
  const passwordRef=useRef()
  const [error,setError]=useState()
  const [loading,setLoading]=useState(false)
  
  const navigate=useNavigate()
  const handleChange=(event)=>{
    setFormData(
      {
        ...formData,
        [event.target.id]:event.target.value,
      }
    )
  }

  const handleSubmit=async(event)=>{
    try{
      event.preventDefault()
    setLoading(true)
    if(signInState==='Sign Up'){
        const res=await fetch('http://localhost:3000/api/auth/signup',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(formData)
        })
        const data=await res.json()
        
        if(data.success===false) {
          setError(data.message)
          setLoading(false)
          return;
        }
        emailRef.current.value=''
          passwordRef.current.value=''
          setSignInState('Sign In');
          setLoading(false)
          setError(null)
          
    }else{
      setLoading(true)
      const {email,password}=formData
      const res=await fetch('http://localhost:3000/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({email,password}),
        credentials: 'include'
      })
      const data=await res.json()
      console.log('data:',data)
      if(data.success===false) {
        setError(data.message)
        setLoading(false)
        return;
      } 
      
        setLoading(false)
        setError(null)
        navigate('/')

    }
    }catch(err){
        setLoading(false)
        setError(err.message)
    }

  }
  return (
    <div className="p-3 max-w-lg mx-auto mt-4">
      <h1 className="text-4xl text-center font-bold  blended-blue pb-6">
        {signInState}
      </h1>
      {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
       
        {signInState==='Sign Up'&&<input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />}
        <input
          ref={emailRef}
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        {signInState==='Sign Up'&&<input
          type="number"
          placeholder="number"
          className="border p-3 rounded-lg"
          id="number"
          onChange={handleChange}
        />}
        <input
          ref={passwordRef}
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        {signInState==='Sign Up'&&<input
          type="password"
          placeholder=" confirm password"
          className="border p-3 rounded-lg"
          id="confirmPassword"
          onChange={handleChange}
        />}
        <button disabled={loading} type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading?'loading...':signInState}
        </button>
      </form>
      <div className="flex gap-2 mt-1 ">
        {signInState === "Sign Up" ? (
          <>
            <p>Have an account?</p>
            <span
              className="text-blue-700 text-md hover:underline cursor-pointer"
              onClick={() => {
                setSignInState("Sign In");
              }}
            >
              Sign In
            </span>
          </>
        ) : (
          <>
            <p>New to TodoApp?</p>
            <span
              className="text-blue-700 text-md hover:underline cursor-pointer"
              onClick={() => {
                setSignInState("Sign Up");
              }}
            >
              Sign Up
            </span>
          </>
        )}
      </div>
      
    </div>
  );
};

export default Login;
