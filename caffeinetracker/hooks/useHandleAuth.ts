import React from 'react'
import { app, firestore } from "../firebaseConfig";
import { Auth, User, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, getAuth, updateProfile } from '@firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { FirebaseError } from 'firebase/app';
import { useUser, UserData } from '@/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
export enum ActionType {
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
    const auth = getAuth(app)
    const { setUser, user: _user } = useUser();



    function isGoogleUser(user: User | GoogleUser): user is GoogleUser {
        return (user as GoogleUser).id !== undefined;
    }

    const handleAuth = async (user: User | GoogleUser | null, type: ActionType, email: string, password: string, username?: string) => {
        try {
            if (type === ActionType.LOGOUT) {
                await signOut(auth);
                if (_user?.provider === 'Google') {
                    await GoogleSignin.signOut();
                }
                setUser(null);
                console.log('User logged out successfully!');
                return { success: true, message: 'User logged out successfully!' };
            } else {
                if (type === ActionType.LOGIN_EMAIL_PASS) {
                    const signedUser = await signInWithEmailAndPassword(auth, email, password);
                    if (!signedUser.user.displayName) {
                        const userRef = doc(firestore, "users", signedUser.user.uid);
                        const userSnapshot = await getDoc(userRef);
                        if (userSnapshot.exists()) {
                            const userData = userSnapshot.data();
                            await updateProfile(signedUser.user, {
                                displayName: userData.displayName || signedUser.user.email?.split('@')[0],
                            });
                        } else {
                            console.log('User document not found!');
                        }
                    }
                    user = signedUser.user;
                    console.log('User signed in successfully!');
                } else if (type === ActionType.REGISTER) {
                    const newUser = await createUserWithEmailAndPassword(auth, email, password);
                    await updateProfile(newUser.user, {
                        displayName: username,
                    });
                    user = newUser.user;
                    console.log('User registered successfully!');
                }
                if (!user) return { success: false, message: 'user not found!' };
                const userDoc = {
                    uid: isGoogleUser(user) ? user.id : user.uid,
                    email: user.email,
                    username: isGoogleUser(user) ? user.name : user.displayName,
                    coffees: [],
                    photo: isGoogleUser(user) ? user.photo : null,
                    provider: isGoogleUser(user) ? 'Google' : 'Email/Password',
                }
                await setDoc(doc(firestore, "users", userDoc.uid), userDoc)
                console.log('User created successfully!');
                setUser(userDoc);
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
