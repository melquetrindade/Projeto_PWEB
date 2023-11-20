import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from './firebaseService'

//console.log(auth)
export async function login(email, senha){
    return signInWithEmailAndPassword(auth, email, senha)
}

export async function logOut(){
    return signOut(auth)
}

export function onAuthChanged(func){
    return onAuthStateChanged(auth, func)
}

export function registrar(email, senha){
    return createUserWithEmailAndPassword(auth, email, senha)
}