import React, {createContext, useState} from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [IsKidAccount, setIskIdAccount] = useState(false);
    // console.log('Is kid account (authCOntext): ', IsKidAccount)
    return (
        <AuthContext.Provider
            value={{
                IsKidAccount,
                setIskIdAccount
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;