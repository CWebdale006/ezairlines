import React from "react";
import axios from 'axios';
import { useAuth0 } from "../react-auth0-spa";

// getting the body parser object
let bodyParser = require('body-parser');

export default function UpdateInfo() {

    const update = async () => {
        try {
            /**
             * getting a token to make requests to the management
             * api with 
             */
            const response = await fetch("http://localhost:3001/get-token");
            const responseData = await response.json();
            const token = await responseData.token;

            /** 
             * now using the token
             */
            const info = {
                userId: "google-oauth2|116658177472204313093",
                token: token,
                body: {
                    // "user_metadata" : { "tickets": {BookedTickets} }
                    user_metadata: { 'test': 'from update info' }
                }
            };
            
            axios.patch('http://localhost:3001/book', info)
                .then(res=>console.log(res.data));
        } catch (error) {
            console.error("other error is: "+error);
        }
    }

    return (
        <>
            <h1>update info</h1>
            <button onClick={update}>Update user</button>
        </>
    )
}
