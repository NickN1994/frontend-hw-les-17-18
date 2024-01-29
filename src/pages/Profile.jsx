import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {jwtDecode} from "jwt-decode";

function Profile() {

    const {auth} = useContext(AuthContext);
    const [data, setData] = useState({});

    useEffect(async () => {
        const abortController = new AbortController();
        const token = localStorage.getItem('token');
        // const decodedToken = jwtDecode(token);

        try {
            const response = await axios.get("http://localhost:3000/660/private-content", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data)
        } catch (e) {
            console.error(e)
        }
        return () => {
            console.log("clean up");
            abortController.abort();
        }
    }, []);


    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {auth.user.username}</p>
                <p><strong>Email:</strong> {auth.user.email}</p>
            </section>
            <section>
                <h2>Strikt geheime profiel-content</h2>
                <h3>{data.title}</h3>
                <p>{data.content}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;