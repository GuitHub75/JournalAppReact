// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5JGDfP5SaGBV_oN-hJjQFuJW6aRqEkqw",
  authDomain: "learn-react-489c3.firebaseapp.com",
  projectId: "learn-react-489c3",
  storageBucket: "learn-react-489c3.appspot.com",
  messagingSenderId: "544163684336",
  appId: "1:544163684336:web:7f035b26f492a1b0ea8735"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//funcionalidades de autenticacion.
export const FirebaseAuth = getAuth(FirebaseApp);
//Configuracion de la base de datos o para usar la base de datos.
export const FirebaseDB = getFirestore(FirebaseApp);
