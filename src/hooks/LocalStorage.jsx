import { useEffect, useState } from "react";


export function useLocalStorage(key, initValue) {
    if(!key) throw new Error("Key is not provided to figure out the storage.");

    const [data, setData] = useState(() => {
        if (typeof window === 'undefined') {
            return initValue;
        }

        const currentData = localStorage.getItem(key);
        return currentData ? JSON.parse(currentData) : initValue
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch(error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
        }
    }, [key, data]);

    return [data, setData]
}


