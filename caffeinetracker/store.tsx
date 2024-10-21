import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the User type
export interface UserData {
    uid: string;
    email: string | null;
    username: string | null;
    coffees: never[];
    photo: string | null;
    provider: string;
}


// Define the context type
interface UserContextType {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }} >
            {children}
        </UserContext.Provider>
    );
}

// Create a custom hook to use the user context
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
export default UserContext;