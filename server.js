// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Require Cors 
const cors = require('cors');
// Require bodyParser
const bodyParser = require('body-parser');
// Listen Port.
const port = 3000;
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port, () => {
    console.log(`Server Is Running On: http://localhost:${port}`)
});

// GET All Data 
app.get('/getData', (req, res) => {
    res.send(projectData).end();
});

// POST All Data
app.post('/postData', (req, res) => {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };
    res.send(projectData).end();
});