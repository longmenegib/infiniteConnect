import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        console.log('New user value: ', user);
    }, [user])
    return (
        <authContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </authContext.Provider>
    )
};

export default AuthContextProvider;