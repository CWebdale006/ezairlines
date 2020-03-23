const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// creates a new express app 
const app = express();

// accept cross-origin requests from the frontend app 
app.use(cors({ origin: 'http://localhost:3000' }));

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

// starts the app 
app.listen(3001, () => console.log('API listening on port 3001'));