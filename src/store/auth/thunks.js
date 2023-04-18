import { async } from "@firebase/util";
import { LogoDevTwoTone } from "@mui/icons-material";
import { loginWithEmailPassword, logoutFirebase, registerUserWhithEmailpassword, singInWithGoogle } from "../../firebase/providers";
import { login, chekingCredentials, logouth } from "./"

export const chekingAuthentication = (email, password) =>{
   return async (dispatch) =>{
    dispatch(chekingCredentials());
   }
}

export const startgGoogleSigIn = (email, password) =>{
    return async (dispatch) =>{
     dispatch(chekingCredentials());
     const result = await singInWithGoogle();
     if(!result.ok) return dispatch(logouth(result));
     dispatch(login(result));
     
    }
 }
 

 export const startCreateUserWithEmailPassword = ({email, password, displayName}) =>{
     return async(dispatch) =>{
         dispatch(chekingCredentials());
           const {ok,uid, photoURL, errorMessage} = await  registerUserWhithEmailpassword({email,password,displayName});
           console.log(errorMessage);
           const resp = {
            errorMessage: errorMessage, 
           }
          if (!ok) return dispatch(logouth(resp));
        dispatch(login({uid,displayName,email,photoURL}));
       // console.log(resp);
  }
}

export const startLoginWithEmailPassword = ({email, password})=>{
  return async (dispatch) =>{

    dispatch(chekingCredentials());

    const resp = await loginWithEmailPassword({email, password});
    console.log(resp);
    const res = {
      errorMessage: resp.errorMessage, 
     }
    if (!resp.ok) return dispatch(logouth(res));
    dispatch(login(resp));
  }
}


export const startLogouth = ()=>{
  return async(dispatch) =>{
    await logoutFirebase();
    dispatch(logouth({}));
  }
}

