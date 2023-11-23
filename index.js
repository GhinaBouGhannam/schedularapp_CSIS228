// Imports
var express = require("express");
require('dotenv').config(); // Load environment variables
const bodyParser = require('body-parser'); // Parse incoming request bodies
const cors = require('cors'); // Enable CORS for all origins

// Create an Express application and set the  port number 
const app = express();
const PORT = process.env.PORT;

// Middleware for parsing request bodies and enabling CORS
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

// Import route modules
const patientRoute = require("./routes/patient.route");
const userRoute = require("./routes/user.route");
const appointmentRoute = require("./routes/appointment.route");

// Integrate routes to appropriate paths
app.use(`/api/patients`,patientRoute); // Handle patient routes
app.use(`/api/users`,userRoute); // Handle user routes
app.use(`/api/appointments`,appointmentRoute ); // Handle appointment routes

//Start the express application and listen to connections on the specified port
app.listen(PORT);
console.log(`Your app is running on ${PORT}`);