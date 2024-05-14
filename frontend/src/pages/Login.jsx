import React, { useState } from "react";

const Login = () => {
  const [signInState, setSignInState] = useState("Sign In");
  return (
    <div className="p-3 max-w-lg mx-auto mt-4">
      <h1 class="text-4xl text-center font-bold  blended-blue pb-6">
        {signInState}
      </h1>
      <form className="flex flex-col gap-3">
       
        {signInState==='Sign Up'&&<input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />}
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        {signInState==='Sign Up'&&<input
          type="number"
          placeholder="number"
          className="border p-3 rounded-lg"
          id="number"
        />}
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        {signInState==='Sign Up'&&<input
          type="password"
          placeholder=" confirm password"
          className="border p-3 rounded-lg"
          id="confirmPassword"
        />}
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
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
