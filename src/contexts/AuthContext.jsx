import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext({
    userId: null,
    token: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useLocalStorage('userId', null);
    const [token, setToken] = useLocalStorage('token', null);

    const login = (newUserId, newToken) => {
        setUserId(newUserId);
        setToken(newToken);
    }

    const logout = () => {
        setUserId(null);
    }

    const value = {
        userId,
        token,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;