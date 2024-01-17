import {createContext} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const data = {
        username: 'yourName',
        email: 'yourEmail'

    }


    return (
        <AuthContext.provider value={data}>
            {children}
        </AuthContext.provider>

    )
}

export default AuthContextProvider;