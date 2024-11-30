import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {

    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error: any) {
            console.error(`Error Reading LocalStorage Key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof valueToStore === "string") {
                localStorage.setItem(key, valueToStore);
            } else {
                localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error: any) {
            console.error(`Error Setting LocalStorage Key "${key}":`, error);
        }
    }

    return [storedValue, setValue] as const;

}

export default useLocalStorage;