import { firestore } from '@/firebaseConfig';
import { User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'

const useGetCoffeeDataByUid = (user: any,) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const [coffeeData, setCoffeeData] = useState({})

    const getCoffeeData = async (user: any,) => {
        if (isUpdating || user == null) return

        setIsUpdating(true)

        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setCoffeeData(docSnap.data()?.coffees)

        setIsUpdating(false)
    }

    getCoffeeData(user)

    return {  coffeeData }
    
}

export default useGetCoffeeDataByUid