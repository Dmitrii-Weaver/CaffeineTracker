import { firestore } from '@/firebaseConfig';
import { User } from 'firebase/auth';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'

const useLogCoffee = () => {
    const [isUpdating, setIsUpdating] = useState(false)

    const logCoffee = async (user: any, newCoffeeData: any) => {


        if (isUpdating || user == null) return
        setIsUpdating(true)

        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        

        await updateDoc(docRef, {
            coffees: arrayUnion(newCoffeeData)
        });

        setIsUpdating(false)

    }
    return logCoffee
}

export default useLogCoffee
