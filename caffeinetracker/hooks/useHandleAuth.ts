import React from 'react'
import { firestore } from "../firebaseConfig";
import { Auth, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { router } from 'expo-router';



const useHandleAuth = () => {
    const handleAuth = async (user: User | null, auth: Auth, isLogin: boolean, email: string, password: string, username: string) => {
        try {
            if (user) {
                await signOut(auth);
                router.replace('/signin');
            } else {
                if (isLogin) {
                    await signInWithEmailAndPassword(auth, email, password);
                    router.replace('/');
                } else {
                    await createUserWithEmailAndPassword(auth, email, password);
                    router.replace('/');
                }
            }
            return { success: true };
        } catch (error: any) {
            console.error('Authentication error:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);

            return { error: 'Invalid email or password. Please try again.' };
        }
    }
    return handleAuth
};


export default useHandleAuth
