import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { round } from 'mathjs';
import "../css/FlightList.css";

import { useAuth0 } from "../react-auth0-spa";

// getting the weather
function Weather(to) {
    function getWeather(city) {
        fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+',us&APPID=4cf9476bc10145918605334adf1a590a')
            .then(res=>res.json())
            .then(data => {
                function toF(k) {
                    // converts Kelvin to fahrenheit and rounds to 
                    // 2 decimal places
                    return round(((k - 273.15)*9/5+32),2);
                }

                // adding the city name to the h4
                const cityDiv = document.getElementById("city");
                const cityData = city
                cityDiv.innerHTML = "Weather: " + cityData[0].toUpperCase() + cityData.slice(1);

                // adding the temperature in Fahrenheit
                const temp = document.getElementById("temp");
                const tempDataK = data.main.temp;
                temp.innerHTML = "Temperature: " + toF(tempDataK) + "&degF";

                // adding the "feels like" temperature in Fahrenheit
                const feelsLike = document.getElementById("feelsLike");
                const feelsLikeDataK = data.main.feels_like;
                feelsLike.innerHTML = "Feels like: " + toF(feelsLikeDataK) + "&degF";

                // adding the high in Fahrenheit
                const high = document.getElementById("high");
                const highData = data.main.temp_max;
                high.innerHTML = "High: " + toF(highData) + "&degF";

                // adding the low in Fahrenheit
                const low = document.getElementById("low");
                const lowData = data.main.temp_min;
                low.innerHTML = "Low: " + toF(lowData) + "&degF";

                // adding the humidity 
                const humidity = document.getElementById("humidity");
                const humidityData = data.main.humidity;
                humidity.innerHTML = "Humidity: " + humidityData + "%";
            }
        )
    };

    getWeather(to.to);

    return (
        <>
            <h4 id="city">Weather: </h4>
            <div className="container">
                <div className="col">
                    <div className="row" id="temp">Hover over a ticket to see weather information</div>
                    <div className="row" id="feelsLike"></div>
                    <div className="row" id="high"></div>
                    <div className="row" id="low"></div>
                    <div className="row" id="humidity"></div>
                </div>
            </div>
        </>
    )
}

// const Destination = props => {
//     const { isAuthenticated, loginWithRedirect } = useAuth0();
//     console.log(props.destination);
//     alert(props.destination);

//     return (
//         <tr id={props.destination.to}>
//             <td>{props.destination.from}</td>
//             <td>{props.destination.to}</td>
//             <td>{props.destination.departDate.substring(0,10)}</td>
//             <td>{props.destination.returnDate.substring(0,10)}</td>
//             <td>{props.destination.price}</td>
//             <td>
//                 {!isAuthenticated && (
//                     <button type="button" className="btn btn-primary" onClick={() => loginWithRedirect({})}>Purchase</button>
//                 )}

//                 {isAuthenticated && (
//                     <button type="button" className="btn btn-primary">
//                         <Link id="link" to={'/book/'+props.destination._id}>Purchase</Link>
//                     </button>
//                 )}
//             </td>
//         </tr>
//     )
// };



const Action = props => {
    return ( 
        <div>
            <h2>hey</h2>
            {!props.isAuthenticated && (
                    <button type="button" className="btn btn-primary" onClick={() => props.loginWithRedirect({})}>Purchase</button>
                )}

            {props.isAuthenticated && (
                <button type="button" className="btn btn-primary">
                    <Link id="link" to={'/book/'+props.destination._id}>Purchase</Link>
                </button>
            )}
        </div>
    )
};

const FlightsList = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    axios.get('http://localhost:3001/destinations')
        .then(res=>{
            const list = res.data;
            let listHTML = document.getElementById("destinationsList")

            let x = 0;
            
            listHTML.innerHTML = (
                list.map(currentDestination=>{
                    console.log(currentDestination)
                    // return (
                    //     <tr id={currentDestination.to}>
                    //         <td>{currentDestination.from}</td>
                    //         <td>{currentDestination.to}</td>
                    //         <td>{currentDestination.departDate.substring(0,10)}</td>
                    //         <td>{currentDestination.returnDate.substring(0,10)}</td>
                    //         <td>{currentDestination.price}</td>
                    //         <td>
                    //             {!isAuthenticated && (
                    //                 <button type="button" className="btn btn-primary" onClick={() => loginWithRedirect({})}>Purchase</button>
                    //             )}
                
                    //             {isAuthenticated && (
                    //                 <button type="button" className="btn btn-primary">
                    //                     <Link id="link" to={'/book/'+currentDestination._id}>Purchase</Link>
                    //                 </button>
                    //             )}
                    //         </td>
                    //     </tr>
                    // )
                    x++
                    // <Action key={currentDestination._id} isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect} />
                    return `<tr id=${currentDestination.to} ><td>${currentDestination.from}</td><td>${currentDestination.to}</td><td>${currentDestination.departDate.substring(0,10)}</td><td>${currentDestination.returnDate.substring(0,10)}</td><td>${currentDestination.price}</td><td class="actions">
                    ${!isAuthenticated && (
                            <button type="button" className="btn btn-primary" onClick={()=> loginWithRedirect({})}>Purchase</button>
                        )}
                    ${isAuthenticated && (
                        <button type="button" className="btn btn-primary">
                            <Link id="link" to={'/book/'+currentDestination._id}>Purchase</Link>
                        </button>
                    )}
                        </td></tr>`
                })
            )
            // for (let i = 0; i <= x; i++) {
            //     let y = list[i]
            //     ReactDOM.render(<Action key={y._id} />,document.getElementsByClassName("actions")[i]);          
            // }
        })
        .catch((error)=>{
            console.log("axios error is: "+error);
        })


    // const [ destinations, setDestinations ] = useState([]);
    // const [ destinationList, setDestinationList ] = useState();
    
    const HeaderText = () => {
        const { loading, user } = useAuth0();

        if (loading || !user) {
            return <div>Book a flight</div>;
        }

        return ( 
            <Fragment>
                Welcome, {user.given_name}!
            </Fragment>
        )
    };

    return( 
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className="display-4">
                                <HeaderText />
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <table className="table">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>From</th>
                                                    <th>To</th>
                                                    <th>Depart Date</th>
                                                    <th>Return Date</th>
                                                    <th>Price</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody id="destinationsList">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <div id="weatherApi">
                                                <Weather to="sacramento" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card" id="hehe">
                                <div className="card-body">
                                    {/* filler */}
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h4>google maps somehow? </h4>
                                            <div id="mapsApi">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default FlightsList;