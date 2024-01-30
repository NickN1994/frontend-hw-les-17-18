import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending'
    });
    const navigate = useNavigate();

useEffect(() => {
    const abortController = new AbortController();
    const token = localStorage.getItem('token');

    if (token && isTokenValid(token)) {

        void login(token);
    } else {

        setAuth({
            isAuth: false,
            user: null,
            status: 'done'
        })
    }
    return () => {
        console.log("clean up");
        abortController.abort();
    }

}, [])

    async function login (token) {
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        
        try {

            const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            setAuth({
                isAuth: true,
                user: {
                    username: response.data.gebruikersnaam,
                    email: response.data.email,
                    id: response.data.id
                },
                status: 'done',
            });
            console.log("Ingelogd")
            navigate('/profile')
        } catch (e) {
            logout();
        }
    }

    function logout () {

        console.log("Uitgelogd")
        setAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });
        navigate('/')
    }

    const data = {
        auth: auth,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={ data }>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;