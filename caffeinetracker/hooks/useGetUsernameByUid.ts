import { firestore } from '@/firebaseConfig';
import { User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'

const useGetUsernameByUid = (user: any) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const [username, setUsername] = useState ("")

    const getUsernameByUid = async (user: any,) => {
        if (isUpdating || user == null) return

        setIsUpdating(true)

        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUsername(docSnap.data()?.username)

        setIsUpdating(false)

        return username
    }

    getUsernameByUid(user)

    return {username}
}

export default useGetUsernameByUid