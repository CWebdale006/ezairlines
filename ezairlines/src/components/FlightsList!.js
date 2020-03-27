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
            .then(dtata=>{
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

    return (
        <>
            
        </>
    )
}