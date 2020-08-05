const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// .env
require('dotenv').config();

// creates a new express app 
const app = express();

// accept cross-origin requests from the frontend app 
app.use(cors({ origin: 'http://localhost:3000' }));

// body parser middleware  
app.use(express.json());

// links to database
const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

/**
 * getting a token!!!!!!
 */ 
// hiding client secret
const clientSecret = process.env.CLIENT_SECRET;

// defining a path that our front-end can use 
app.get('/get-token', (req, res)=>{
    // doing what (i think) auth0 wants me to do, making a POST request 
    // to my site and then returning the body, which has my token 
    var request = require("request");

    var options = { 
        method: 'POST',
        url: 'https://ezairlines.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"Lx7AjTCAhZd1VY7g6OUKsg331tvOTUTa","client_secret":"'+clientSecret+'","audience":"https://ezairlines.us.auth0.com/api/v2/","grant_type":"client_credentials"}'
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.send({
            token: JSON.parse(body).access_token
        });
    });
});

/**
 * updating the user through auth0
 */
app.patch('/book', (req, res)=>{
    var request = require("request");

    // breaking down request data
    const userId = req.body.userId;
    const token = req.body.token;
    const body = req.body.body;

    console.log(`the token is: ${token}`)

    var options = {
        method: 'PATCH',
        url: 'https://ezairlines.us.auth0.com/api/v2/users/'+userId,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        res.json(response);
    });
});

// getting destination data from mongoDB to populate the FlightList
// component 
const ticketsRouter = require('./routes/tickets');
app.use('/tickets', ticketsRouter);



// starts the app 
app.listen(3001, () => console.log('API listening on port 3001'));