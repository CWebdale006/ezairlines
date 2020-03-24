const express = require('express');
const cors = require('cors');
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

// set up auth0 configuration
const authConfig = {
    domain: 'dev-0anjj2er.auth0.com',
    audience: 'https://api.mysite.com'
};

// defines middleware that validates incoming bearer tokens 
// using JWKS from dev-0anjj2er.auth0.com
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ['RS256']
});

// defines an endpoint that must be called with an access token
app.get('/api/external', checkJwt, (req, res) => {
    res.send({
        msg: 'Your access token was successfully validated sir'
    });
});

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
        url: 'https://dev-0anjj2er.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"Nye1Ijo0IA8fAQ4SXINaoq2owdY3h5u2","client_secret":"'+clientSecret+'","audience":"https://dev-0anjj2er.auth0.com/api/v2/","grant_type":"client_credentials"}'
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

    var options = {
        method: 'PATCH',
        url: 'https://dev-0anjj2er.auth0.com/api/v2/users/'+userId,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }
    console.log(options.body);

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        res.json(response);
    });
});


// starts the app 
app.listen(3001, () => console.log('API listening on port 3001'));