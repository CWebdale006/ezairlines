import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

import { useAuth0 } from "../react-auth0-spa";

export default function BookFlight() {
    const { user } = useAuth0();

    // settting up variables to work with state 
    const [ from, setFrom ] = useState();
    const [ to, setTo ] = useState();
    const [ departDate, setDepartDate ] = useState(new Date());
    const [ returnDate, setReturnDate ] = useState(new Date());
    const [ price, setPrice ] = useState();
    const [ amount, setAmount ] = useState(1);

    // css of the loader
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: #0062cc;
    `;

    const overlay = {
        position: "fixed",
        display: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        zIndex: 2,
        cursor: "pointer"
    };

    const text = {
        position: "absolute",
        top: "50%",
        left: "50%",
        fontSize: "50px",
        color: "white",
        transform: "translate(-50%,-50%)"
    };
    

    // getting id from parameters to use for axios request to database 
    let { id } = useParams();

    // useeffect takes a second parameter, putting it in fixes a 
    // problem that i've been dealing with for a while, and makes it 
    // so that the function only runs once, without it the axios request 
    // get made over and over and breaks the site 
    useEffect(()=>{
        document.getElementById("overlay").style.display = "none"
        axios.get('http://localhost:3001/destinations/'+id)
            .then(res=>{
                // setting state to data from my backend
                setFrom(res.data.from);
                setTo(res.data.to);
                setDepartDate(new Date(res.data.departDate));
                setReturnDate(new Date(res.data.returnDate));
                setPrice(res.data.price);
            })
            .catch((error)=>{
                console.log("axios error: "+error);
            })
    }, []);

    const on = () => {
        document.getElementById("overlay").style.display = "block"
    }

    const off = () => {
        document.getElementById("overlay").style.display = "none"
        window.location.replace("http://localhost:3000")
    }

    return (
        <>
            <div id="overlay" style={overlay} onClick={off}>
                <div id="text" style={text}>
                    <ClipLoader 
                        css={override}
                        size={100}
                        color={"#0062cc"}
                        loading={true}
                    />
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-10">
                        <h6 className="display-4 text-center">Review your trip</h6>
                        <div className="card">
                            <div className="card-body">
                                {/* <h5 className="card-title">Special title treatment</h5> */}

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
                                        <DatePicker 
                                            selected={departDate}
                                            onChange={date=>setDepartDate(date)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">Return date: </h6>
                                    </div>
                                    {/* <div className="col">{JSON.stringify(returnDate)}</div> */}
                                    <div className="col">
                                        <DatePicker 
                                            selected={returnDate}
                                            onChange={date=>setReturnDate(date)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">Amount: </h6>
                                    </div>
                                    <div className="col">
                                        <input type="number" defaultValue="1" min="1" max="30" onChange={(e)=>{setAmount(e.target.value)}}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-text">Price: </h6>
                                    </div>
                                    <div className="col">{
                                        (price*amount).toFixed(2)
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
            // starting the loading screen 
            on()

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
                pricePer: price,
                priceTotal: (price*amount).toFixed(2),
                amount: amount
            }

            const asdf = "random string";

            // using that token for a request
            const info = { 
                userId: user.sub, 
                token: token, 
                body: { 
                    "user_metadata": { tickets: { bookedTickets } }
                }
            }

            axios.patch('http://localhost:3001/book', info)
                .then(res=>{
                    if (res.data.statusCode===400) {
                        console.log(res.data);
                        return (
                            document.getElementById("text").innerHTML = `
                                <p class="text-center">
                                    Something went wrong :( <br/>
                                    <small class="text-muted">please try again later</small>
                                </p>
                            `
                        )
                    }
                    console.log(res.data);
                    document.getElementById("text").innerHTML = `
                        <p class="text-center">
                            Successfully booked!<br/>
                            <small class="text-muted">click to dismiss</small>
                        </p>
                    `;
                })
                .catch((error)=>{
                    console.log("axios error when booking: "+error);
                    document.getElementById("text").innerHTML = `
                        <p class="text-center">
                            Something went wrong :( <br/>
                            <small class="text-muted">please try again later</small>
                        </p>
                    `;
                })
        } catch (error) {
            console.log("can't update user: "+error);
            document.getElementById("text").innerHTML = `
                <p class="text-center">
                    Something went wrong :( <br/>
                    <small class="text-muted">please try again later</small>
                </p>
            `;
        }
    }
}
