import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/FlightList.css';
import { round } from 'mathjs';

import { useAuth0 } from "../react-auth0-spa";

function Weather(to) {
    function getWeather(city) {
        fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+',us&APPID=4cf9476bc10145918605334adf1a590a')
            .then(res=>res.json())
            .then(data=>{
                function toF(K) {
                    // converts Kelvin to Fahrenheit and rounds to 2 decimals
                    return round(((K-273.15)*9/5+32),2);
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
    }
    getWeather(to.to);

    // creating empty elements to be filled in with data from the weather api
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

// a template for each ticket 
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
                    <button type="button" className="btn btn-primary" onClick={()=> loginWithRedirect({})}>Purchase</button>
                )}

                {isAuthenticated && (
                    <Link id="link" to={'/book/'+props.destination._id}>
                        <button type="button" className="btn btn-primary">Purchase</button>
                    </Link>
                )}
            </td>
        </tr>
    )
}

export default class FlightsList extends Component {
    constructor(props) {
        super(props);
        this.state = { destinations: [] };
    }

    // getting ticket data from our database and setting it to this.state.destinations
    componentDidMount() {
        axios.get('http://localhost:3001/destinations/')
            .then(res=>{
                this.setState({ destinations: res.data });
                // console.log(this.state.destinations);
            })
            .catch((error)=>{
                console.log("axios error is: "+error);
            })
    }

    render() {
        const HeaderText = () => {
            const { loading, user } = useAuth0();

            if (!user) {
                return <div>Book a flight</div>;
            }

            if (loading) {
                return <div></div>
            }

            return (
                <Fragment>
                    {user.given_name != null && (
                        `Welcome, ${user.given_name}!`
                    )}
                    {user.given_name == null && user.name != null && (
                        `Welcome, ${user.name}`
                    )}
                    {user.given_name == null && user.name == null && (
                        `Welcome!`
                    )}
                </Fragment>
            )
        }

        return ( 
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
                                                <tbody>
                                                    { this.destinationsList() }
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
                                                <div is="weatherApi">
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
                                                <h4>Google Maps somehow?</h4>
                                                <div id="mapsAPi">

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
    }

    // each ticket is written using the Destination component
    destinationsList() {
        return this.state.destinations.map(currentDestination=>{
            return <Destination destination={currentDestination} key={currentDestination._id} />
        })
    }
}