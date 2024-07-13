import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({
    userId: null,
    token: null,
    login: () => {},
    logout: () => {},
    isLoggedIn: () => false,
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
        setToken(null);
    }

    const isLoggedIn = () => {
        if (!userId || !token) return false;
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
            return decoded.exp > now;
        } catch (error) {
            return false;
        }
    }

    const value = {
        userId,
        token,
        login,
        logout,
        isLoggedIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;