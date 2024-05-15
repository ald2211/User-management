import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false
}
export const UserSlice=createSlice({

    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{

            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateUserStart:(state)=>{
            state.loading=true
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.loading=false;
            state.error=null
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteUserStart:(state)=>{
            state.loading=true;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        deleteUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false
        },
        signOutUserStart:(state)=>{
            state.loading=true;
        },
        signOutUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        signOutUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false
        },
        clear:(state)=>{
            state.error=null
        }
    }
})

export const {signInFailure,signInStart,signInSuccess,updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserFailure,signOutUserStart,signOutUserSuccess,clear}=UserSlice.actions
export default UserSlice.reducer