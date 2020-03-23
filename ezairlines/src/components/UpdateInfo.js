import React from "react";
import { useAuth0 } from "../react-auth0-spa";

export default function UpdateInfo() {

    const update = async () => {
        try {
            
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
