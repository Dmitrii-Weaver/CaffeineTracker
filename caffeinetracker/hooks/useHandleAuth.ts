import React from 'react'
import { firestore } from "../firebaseConfig";
import { Auth, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { FirebaseError } from 'firebase/app';


const useHandleAuth = () => {
    const handleAuth = async (user: User | null, auth: Auth, isLogin: boolean, email: string, password: string, username: string) => {
        try {
            if (user) {
                console.log('User logged out successfully!');
                await signOut(auth);
                return { success: true, message: 'User logged out successfully!' };
            } else {
                if (isLogin) {
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log('User signed in successfully!');
                    return { success: true, message: 'User signed in successfully!' };
                } else {
                    const newUser = await createUserWithEmailAndPassword(auth, email, password);

                    const usersRef = collection(firestore, "users")
                    const userDoc = {
                        uid: newUser.user.uid,
                        email: newUser.user.email,
                        username: username,
                        coffees: []
                    }
                    await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)
                    localStorage.setItem("user-info", JSON.stringify(userDoc))

                    console.log('User created successfully!');
                    return { success: true, message: 'User created successfully!' };
                }
            }
            return { success: true };
        } catch (error: any) {

          console.error('Authentication error:', error.code, error.message);
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/invalid-email':
                    case 'auth/invalid-login-credentials':
                        return { success: false, message: 'Incorrect email or password' };
                    case 'auth/weak-password':
                        return { success: false, message: 'Password should be at least 6 characters' };
                    case 'auth/email-already-in-use':
                        return { success: false, message: 'Email already in use' };
                    case 'auth/too-many-requests':
                        return { success: false, message: 'Too many failed login attempts. Please try again later.' };
                    case 'auth/network-request-failed':
                        return { success: false, message: 'Network error. Please check your internet connection.' };
                    default:
                        return { success: false, message: `Authentication error: ${error.code}` };
                }
            }
            return { success: false, message: 'An unexpected error occurred. Please try again.' };
        }
    }
    return handleAuth
};

export default useHandleAuth
