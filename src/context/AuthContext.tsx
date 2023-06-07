import React, { createContext, useState, ReactNode } from 'react';

interface IUser {
    id: number;
    email: string;
}

interface AuthContextType {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
