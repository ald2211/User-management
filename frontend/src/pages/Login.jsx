import React, { useRef, useState } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { signInFailure,signInStart,signInSuccess,clear} from "../Redux/Reducer/UserSlice";
import * as Yup from 'yup'


const Login = () => {
  const [signInState, setSignInState] = useState("Sign In");
  const [formData,setFormData]=useState({username:'',email:'',password:'',confirmPassword:'',number:''})
  const emailRef=useRef()
  const passwordRef=useRef()
  const{loading,error}=useSelector((state)=>state.user)
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const [formError,setFormError]=useState()

  
  const validationSchema= Yup.object({
    username:Yup.string().required('username is required'),
    email: Yup.string().email("Invalid email format").required('email is required'),
    number:Yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Invalid phone number')
    .required('Phone number is required'),
    password:Yup.string().required('password is required')
    .min(8,"password must be at leaset 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/,'atleast one symbol required')
    .matches(/[0-9]/,"atleast one number required")
    .matches(/[A-Z]/,"atleast one uppercase letter required")
    .matches(/[a-z]/,"atleast one lowercase letter required"),
    confirmPassword:Yup.string().oneOf([Yup.ref("password")],"password must match").required("confirmpassword is required")
  })




  if(error!==null || formError!==null){
    setTimeout(()=>{
      setFormError(null)
      dispatch(clear())
    },6000)
  }
  
  const handleChange=(event)=>{
    setFormData(
      {
        ...formData,
        [event.target.id]:event.target.value,
      }
    )
  }
  const handleSubmit=async(event)=>{
    event.preventDefault()
    try{
      
      
    if(signInState==='Sign Up'){
      await validationSchema.validate(formData,{abortEarly:false})
    dispatch(signInStart())
        const res=await fetch('http://localhost:3000/api/auth/signup',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(formData)
        })
        const data=await res.json()
        
        if(data.success===false) {
          dispatch(signInFailure(data.message))
          return;
        }
        emailRef.current.value=''
          passwordRef.current.value=''
          setSignInState('Sign In');
          dispatch(signInSuccess(data))
          
    }else{
      dispatch(signInStart())
      const {email,password}=formData
      
      if(email==""){
        dispatch(signInFailure('email is required'))
        return
      }
      if(password==""){
        dispatch(signInFailure('password is required'))
        return
      }

      
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
        dispatch(signInFailure(data.message))
        return;
      } 
      
      dispatch(signInSuccess(data))
        navigate('/')
      
    }
    }catch(err){
      console.log('err:',err.inner)
      const newError={}
      err.inner.forEach((err)=>{
        newError[err.path]=err.message
      })
      setFormError(newError)
      dispatch(signInFailure(error.message))
    }

  }
  return (
    <div className="p-3 max-w-lg mx-auto mt-4">
      <h1 className="text-4xl text-center font-bold  blended-blue pb-6">
        {signInState}
      </h1>
      {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
       
        {signInState==='Sign Up'&&<><input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {formError?.username && <span className="text-red-600  ">{formError.username}</span>}
        </>
        }
        
        <input
          ref={emailRef}
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
       {formError?.email && <p className="text-red-600  ">{formError.email}</p>}
        {signInState==='Sign Up'&&<input
          type="number"
          placeholder="number"
          className="border p-3 rounded-lg"
          id="number"
          name="number"
          onChange={handleChange}
          value={formData.number}
        />
        }
        {formError?.number && <p className="text-red-600 ">{formError.number}</p>}
        <input
          ref={passwordRef}
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        {formError?.password && <p className="text-red-600">{formError.password}</p>}
        {signInState==='Sign Up'&&<input
          type="password"
          placeholder=" confirm password"
          className="border p-3 rounded-lg"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
        />}
        {formError?.confirmPassword && <p className="text-red-600 mb-2 text-center">{formError.confirmPassword}</p>}
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
