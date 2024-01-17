import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    const data = {
        // username: 'yourName',
        // email: 'yourEmail',
        // password: 'passWord',
        isAuth: isAuth,
        login: login,
        logout: logout
    }

    function logout () {
        console.log("Uitgelogd")
        setIsAuth(false);
        navigate('/')
    }

    function login () {
        console.log("Ingelogd")
        setIsAuth(true);
        navigate('/profile')
    }


    return (
        <AuthContext.Provider value={ data }>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthContextProvider;