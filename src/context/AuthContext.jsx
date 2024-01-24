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

}, [])

    async function login (token) {
        localStorage.setItem('token', token);
        console.log("token", token)
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        
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
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id
                },
                status: 'done',
            });
            console.log("Ingelogd")
            navigate('/profile')
        } catch (e) {
            console.log("Uitgelogd")
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
        isAuth: auth.isAuth,
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