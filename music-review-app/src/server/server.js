const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require("body-parser");

const routes = require('./musicReviewsAppRoutes/routes/musicReviewAppRoutes');

// Create a new Express app
const app = express();

// Set up Auth0 configuration
const authConfig = {
  domain: "vishalbhardwaj.auth0.com",
  audience: "http://localhost:3000"
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
  algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
app.get("/secure/uploadNewSong", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});


// Set the routes
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
routes(app);

const PORT = 3000;
// Start the app
app.listen(PORT, () => console.log(`Server is listening at PORT ${PORT}`));