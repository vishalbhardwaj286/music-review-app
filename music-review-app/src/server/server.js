const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require("body-parser");
const serverUtils = require('./serverUtils.js');
const mongoose = require('mongoose');

//import mongoose from 'mongoose';

const routes = require('./musicReviewsAppRoutes/routes/musicReviewAppRoutes');

// Create a new Express app
const app = express();

// Set up Auth0 configuration
const authConfig = {
  domain: serverUtils.AUTH_CONFIG_DOMAIN,
  audience: serverUtils.AUTH_CONFIG_AUDIENCE
};

// Define middleware that validates incoming bearer tokens
// using JWKS from vishalbhardwaj.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: [serverUtils.AUTHORIZATION_ALGORITHM_USED]
});

// Define an endpoint that must be called with an access token

app.use('/secure/uploadNewSong',checkJwt);
app.get("/secure/uploadNewSong", checkJwt, (req, res) => {
  res.send({
    msg: serverUtils.TOKEN_SUCCESSFULLY_VALIDATED
  });
});


// Set the routes
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

var mongoDB = `mongodb+srv://${serverUtils.ATLAS_USERNAME}:${serverUtils.ATLAS_PASSWORD}@cluster0-vtgno.mongodb.net/${serverUtils.DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error',console.error.bind(console,'Error while connecting to Mongo DB. Please check your connection once !!!'));
db.once('open', function() {
  console.log('Connected to mongoose database successfully !');
});
routes(app);

// Start the app
app.listen(serverUtils.SERVER_PORT_NUMBER, () => console.log(`Server is listening at PORT ${serverUtils.SERVER_PORT_NUMBER}`));
