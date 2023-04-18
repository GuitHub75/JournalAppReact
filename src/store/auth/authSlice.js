import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
initialState:{
    status : 'cheking', //cheking  not-authenticated , authenticated
    uid : null,
    email : null,
    displayName : null,
    photoURL : null,
    errrorMessage :null
},
  reducers: {
    login: (state,{payload})=>{
      state.status = 'authenticated'; //cheking  not-authenticated , authenticated
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errrorMessage = null;
    },
    logouth :(state, { payload })=>{
      state.status = 'not-authenticated'; //cheking  not-authenticated , authenticated
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errrorMessage = payload?.errorMessage;
    },
    chekingCredentials : (state)=>{
      state.status = 'cheking';
    }
  },
})

export const { login , logouth, chekingCredentials } = authSlice.actions