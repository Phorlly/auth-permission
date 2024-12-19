import { createContext, useEffect, useState } from "react";
import baseUrl from "../constants";

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState({})

    //get user
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${baseUrl}/user`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // 'Authorization': '',
                    'Content-Type': 'application/json',
                }
            });

            const data = await res.json()

            if (res.ok) setUser(data)
        }

        if (token) getData();
    }, [token])

    // context value
    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};
