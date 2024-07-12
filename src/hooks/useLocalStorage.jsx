import { useState } from 'react';

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, defaultValue);
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });
    const setValue = (newValue) => {
        try {
            const valueToStore = typeof newValue === 'string' ? newValue : JSON.stringify(newValue);
            window.localStorage.setItem(keyName, valueToStore);
            setStoredValue(newValue);
        } catch (err) {
            console.log(err);
        }
    };
    return [storedValue, setValue];
};