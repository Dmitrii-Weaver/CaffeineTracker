import React from 'react'
import { firestore } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";



const useHandleAuth = () => {
    const handleAuth = async (user: any, auth: any, isLogin: any, email: string, password: string, username: string) => {
        try {
            if (user) {
                // If user is already authenticated, log out
                console.log('User logged out successfully!');
                await signOut(auth);
            } else {
                // Sign in or sign up
                if (isLogin) {
                    // Sign in
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log('User signed in successfully!');
                } else {
                    // Sign up
                    const newUser = await createUserWithEmailAndPassword(auth, email, password);

                    const usersRef = collection(firestore, "users")
                    const userDoc = {
                        uid: newUser.user.uid,
                        email: newUser.user.email,
                        username: username,
                        coffees: {
                        }
                    }
                    await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)
                    localStorage.setItem("user-info", JSON.stringify(userDoc))

                    console.log('User created successfully!');
                }
            }
        } catch (error: any) {
            console.error('Authentication error:', error.message);
        }
    }
    return handleAuth
};


export default useHandleAuth