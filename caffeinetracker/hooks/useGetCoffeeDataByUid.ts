import { firestore } from '@/firebaseConfig';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';

const useGetCoffeeDataByUid = (user: User | null) => {
    const [coffeeData, setCoffeeData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getCoffeeData = useCallback(async () => {
        if (!user) return;

        setIsLoading(true);
        setError(null);

        try {
            const docRef = doc(firestore, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setCoffeeData(docSnap.data()?.coffees || null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        getCoffeeData();
    }, [getCoffeeData]);

    return { coffeeData, isLoading, error, refetch: getCoffeeData };
};

export default useGetCoffeeDataByUid;