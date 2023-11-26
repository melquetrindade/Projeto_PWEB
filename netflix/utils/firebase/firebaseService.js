import {initializeApp, getApps} from 'firebase/app'
//import firebase from 'firebase/app';
//import 'firebase/auth';
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';


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
export const db = getFirestore(firebase);
export const auth = getAuth(firebase)