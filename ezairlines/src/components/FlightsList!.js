import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/FlightList.css';
import { round } from 'mathjs';

import { useAuth0 } from "../react-auth0-spa";

const 