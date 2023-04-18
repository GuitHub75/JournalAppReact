import { async } from '@firebase/util';
// Importa las funciones necesarias para iniciar sesión con la cuenta de
// Google desde la biblioteca de autenticación de Firebase.
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth';
import { Await } from 'react-router-dom';
//Importa la configuración de autenticación de Firebase desde otro módulo.
import { FirebaseAuth } from './config';

// Crea un proveedor de autenticación de Google
const googleProvider = new GoogleAuthProvider();
// Exporta una función asíncrona que permite iniciar sesión con la cuenta de Google
export const singInWithGoogle = async()=>{
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
       // Extrae la información del usuario desde el resultado
        const {displayName,email,photoURL,uid} = result.user;
     // Devuelve un objeto con la información del usuario y un indicador de éxito
       return{
        ok:true,
        //user info
        displayName,email,photoURL,uid
       }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return{
            ok:false,
            errorMessage
        }
    }
}


export const registerUserWhithEmailpassword = async ({email, password, displayName})=>{
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email, password);
        const{uid, photoURL } = resp.user;
        //Actualizar el DisplayName en firebase
           await updateProfile(FirebaseAuth.currentUser,{displayName});
        return{
            ok:true,
            uid,
            photoURL,
            email,
            displayName
        }
    } catch (error) {
        return{
            ok:false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async ({email, password})=>{
    try {
        const resp = await  signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL, displayName } = resp.user;
        return{
            ok:true,
            uid,
            photoURL,
            displayName
        }
    } catch (error) {
        console.log(error);
        return{
            ok:false,
            errorMessage: error.message
        }
    }
}


export const logoutFirebase = async ()  =>{
   return await FirebaseAuth.signOut();
}