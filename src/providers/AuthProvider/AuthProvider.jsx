import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

// eslint-disable-next-line no-unused-vars
import React,{ createContext, useEffect, useState }  from 'react';
import app from "../../firebase/firebase.config";
import axios from "axios";


export const authContext = createContext(null);
const auth =getAuth(app)

const provider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {

    const [loader,setLoader]=useState(true);
    
    const [user, setUser] = useState(null)
    const loginUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn=(email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle=()=>{
        return signInWithPopup(auth, provider)
    }
    const SignOut=()=>{
        return signOut(auth);

    }

    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth,(currentUser)=>{
            if(currentUser){
                console.log("user is logged in");
                setUser(currentUser);
                //get and set token
                axios.post('https://art-craf-server-jabedweb.vercel.app/jwt',{email : currentUser.email})
                .then((res)=>{
                    localStorage.setItem('token',res.data.token)
                    console.log(res);
                    console.log(res.data.token);
                })
                .catch((err)=>{
                    console.log(err)
                })

                setLoader(false)
            }
            else{
                console.log("user is not logged in");
                setUser(null);
                setLoader(false)
                localStorage.removeItem('token')
            }

        });
        return ()=>unsubscribe();

    },[user])
    

    const authInfo={
        user,
        loader,
        loginUser,
        signIn,
        signInGoogle,
        SignOut
    }

  return (
    <authContext.Provider value={authInfo}>
        {children}
        </authContext.Provider>
  )
}

export default AuthProvider