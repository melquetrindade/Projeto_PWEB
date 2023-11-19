import {initializeApp, getApps} from 'firebase/app'
//import firebase from 'firebase/app';
//import 'firebase/auth';
import {getAuth} from 'firebase/auth'

/*
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}*/

const firebaseConfig = {
    apiKey: "AIzaSyDOuFejuZeLnkg7OstKKB1oLKnu5FYRUD8",
    authDomain: "projetospotify-268de.firebaseapp.com",
    projectId: "projetospotify-268de",
    storageBucket: "projetospotify-268de.appspot.com",
    messagingSenderId: "994347124410",
    appId: "1:994347124410:web:ba2bd914a2d372b3766483",
    measurementId: "G-8CMP0SRV21",
};

//console.log(getApps().length)
const firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

//export const auth = firebase.auth();
//console.log(firebase)
export const auth = getAuth(firebase)