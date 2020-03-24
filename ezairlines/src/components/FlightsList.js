import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { round } from 'mathjs';

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

const Destination = props => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    return (
        <tr id={props.destination.to}>
            <td>{props.destination.from}</td>
            <td>{props.destination.to}</td>
            <td>{props.destination.departDate.substring(0,10)}</td>
            <td>{props.destination.returnDate.substring(0,10)}</td>
            <td>{props.destination.price}</td>
            <td>
                {!isAuthenticated && (
                    <button type="button" className="btn btn-primary" onClick={() => loginWithRedirect({})}>Purchase</button>
                )}

                {isAuthenticated && (
                    <button type="button" className="btn btn-primary">
                        <Link id="link" to={'/book/'+props.destination._id}>Purchase</Link>
                    </button>
                )}
            </td>
        </tr>
    )
};

const FlightsList = () => {
    
};

export default FlightsList;