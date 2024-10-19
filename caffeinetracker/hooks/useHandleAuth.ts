import React from 'react'
import { firestore } from "../firebaseConfig";
import { Auth, User, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from '@firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { FirebaseError } from 'firebase/app';

 export  enum ActionType {
    LOGOUT = 'LOGOUT',
    LOGIN_EMAIL_PASS = 'LOGIN_EMAIL_PASS',
    REGISTER = 'REGISTER',
    LOGIN_GOOGLE = 'LOGIN_GOOGLE',
}

interface GoogleUser {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
}

const useHandleAuth = () => {

    function isGoogleUser(user: User | GoogleUser): user is GoogleUser {
        return (user as GoogleUser).id !== undefined;
    }

    const handleAuth = async (user: User | GoogleUser | null, auth: Auth, type: ActionType, email: string, password: string, username?: string) => {
        try {
            if (type === ActionType.LOGOUT) {
                await signOut(auth);
                console.log('User logged out successfully!');
                return { success: true, message: 'User logged out successfully!' };
            } else {
                if (type === ActionType.LOGIN_EMAIL_PASS) {
                    const response = await signInWithEmailAndPassword(auth, email, password);
                    if(!response.user) return { success: false, message: 'User log in failed!' };
                    user = response.user
                    console.log('User signed in successfully!');
                } else if (type === ActionType.REGISTER) {
                    const newUser = await createUserWithEmailAndPassword(auth, email, password);
                    if(!newUser.user) return { success: false, message: 'Failed to register user!' };
                    user = newUser.user;
                    console.log('User registered successfully!');
                }
                if(!user) return { success: false, message: 'user not found!' };
                const userDoc = {
                    uid:  isGoogleUser(user) ?  user.id : user.uid,
                    email: user.email,
                    username: isGoogleUser(user) ? user.name : username,
                    coffees: [],
                    ...(isGoogleUser(user) ? {photo: user.photo, provider: 'Google'} : {provider: 'Email/Password'}),
                }
                await setDoc(doc(firestore, "users", userDoc.uid), userDoc)
                    //localStorage.setItem("user-info", JSON.stringify(userDoc))
                console.log('User created successfully!');
                return { success: true, message: 'User created successfully!' };
            }
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
