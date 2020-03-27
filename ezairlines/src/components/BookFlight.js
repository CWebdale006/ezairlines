import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useAuth0 } from "../react-auth0-spa";

// const TicketData = () => {
//     // settting up variables to work with state 
//     // const [ from, setFrom ] = useState();
//     // const [ to, setTo ] = useState();
//     // const [ departDate, setDepartDate ] = useState();
//     // const [ returnDate, setReturnDate ] = useState();
//     // const [ price, setPrice ] = useState();

//     // getting id from parameters to use for axios request to database 
//     let { id } = useParams();

//     return (
//         <div>
//             he
//         </div>
//     )
// }

export default function BookFlight() {
    const { user } = useAuth0();

    // settting up variables to work with state 
    const [ from, setFrom ] = useState();
    const [ to, setTo ] = useState();
    const [ departDate, setDepartDate ] = useState();
    const [ returnDate, setReturnDate ] = useState();
    const [ price, setPrice ] = useState();
    const [ amount, setAmount ] = useState();
    

    // getting id from parameters to use for axios request to database 
    let { id } = useParams();

    axios.get('http://localhost:3001/destinations/'+id)
        .then(res=>{
            setFrom(res.data.from);
            setTo(res.data.to);
            setDepartDate(res.data.departDate);
            setReturnDate(res.data.returnDate);
            setPrice(res.data.price);
        })
        .catch((error)=>{
            console.log("axios error: "+error);
        })

    return (
        <>
            <button onClick={updateUser}>CLick</button>
        </>
    )

    async function updateUser() {
        try { 
            // getting a token to make requests to the management 
            // api with 
            const response = await fetch("http://localhost:3001/get-token");
            const responseData = await response.json();
            const token = await responseData.token;

            // creating the body to send 
            const bookedTickets = {
                from: from, 
                to: to, 
                departDate: departDate,
                returnDate: returnDate,
                price: price,
                amount: amount
            }

            // using that token for a request
            const info = { 
                userId: user.sub, 
                token: token, 
                body: { 
                    "user_metadata": { "tickets": { bookedTickets } }
                }
            }

            axios.patch('http://localhost:3001/book', info)
                .then(res=>console.log(res.data));
        } catch (error) {
            console.log("can't update user: "+error);
        }
    }
}
