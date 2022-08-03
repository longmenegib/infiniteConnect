import React, {createContext, useState, useEffect} from "react";
import { AsyncStorage } from "react-native";

export const AccessContext = createContext();

const AccessProvider = ({children}) => {
    const [isLoggedIn, setisLoggedIn] = useState(null);
    // console.log('Is it locgged in ?(AccessContext): ', isLoggedIn)

    
    return (
        <AccessContext.Provider
            value={{
                isLoggedIn,
                setisLoggedIn
            }}
        >
            {children}
        </AccessContext.Provider>
    )
}

export default AccessProvider;