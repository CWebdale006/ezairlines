import React from "react";
import axios from 'axios';
import { useAuth0 } from "../react-auth0-spa";

// const { user } = useAuth0();
// let userId = user.sub;

export default function UpdateInfo() {
    const { user } = useAuth0();

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
             * getting the id of the user currently logged in 
             */

            /** 
             * now using the token
             */
            const info = {
                userId: user.sub,
                token: token,
                body: {
                    // "user_metadata" : { "tickets": {BookedTickets} }
                    user_metadata: { 'test3': 'from update info' }
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
