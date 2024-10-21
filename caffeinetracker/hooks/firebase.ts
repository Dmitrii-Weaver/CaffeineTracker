import { firestore } from '@/firebaseConfig';
import { UserData } from '@/store';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';

export const useGetCoffeeDataByUid = (user: UserData | null) => {
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

export const useGetUsernameByUid = (user: UserData | null) => {
    const [username, setUsername] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getUsernameByUid = useCallback(async () => {
        if (!user) return;

        setIsLoading(true);
        setError(null);

        try {
            const docRef = doc(firestore, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setUsername(docSnap.data()?.username || null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        getUsernameByUid();
    }, [getUsernameByUid]);

    return { username, isLoading, error, refetch: getUsernameByUid };
};