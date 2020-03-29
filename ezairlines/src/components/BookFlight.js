import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import { useAuth0 } from "../react-auth0-spa";

export default function BookFlight() {
    const { user } = useAuth0();

    // settting up variables to work with state 
    const [ from, setFrom ] = useState();
    const [ to, setTo ] = useState();
    const [ departDate, setDepartDate ] = useState(new Date());
    const [ returnDate, setReturnDate ] = useState(new Date());
    const [ price, setPrice ] = useState();
    const [ amount, setAmount ] = useState();
    

    // getting id from parameters to use for axios request to database 
    let { id } = useParams();

    axios.get('http://localhost:3001/destinations/'+id)
        .then(res=>{
            setFrom(res.data.from);
            setTo(res.data.to);
            setDepartDate(new Date(res.data.departDate));
            setReturnDate(new Date(res.data.returnDate));
            setPrice(res.data.price);
        })
        .catch((error)=>{
            console.log("axios error: "+error);
        })

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-10">
                        <h6 className="display-4 text-center">Review your trip</h6>
                        <div className="card">
                            <div className="card-body">
                                {/* <h5 className="card-title">Special title treatment</h5> */}
                                <p className="card-text">from, to, depart date, return date, price, and user-selected amount.</p>

                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">From: </h6>
                                    </div>
                                    <div className="col">{from}</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">To: </h6>
                                    </div>
                                    <div className="col">{to}</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">Depart date: </h6>
                                    </div>
                                    <div className="col">
                                        {/* <DatePicker 
                                            selected={JSON.stringify(departDate)} 
                                            onChange={date=>setDepartDate(date)} 
                                        /> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">Return date: </h6>
                                    </div>
                                    <div className="col">{JSON.stringify(returnDate)}</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">Amount: </h6>
                                    </div>
                                    <div className="col"></div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">Price: </h6>
                                    </div>
                                    <div className="col">{
                                        price*amount
                                    }</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        {/* filler */}
                                        <p></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <button className="text-center btn btn-primary" onClick={updateUser}>Book your flight</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
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
