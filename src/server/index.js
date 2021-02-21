//API 
// const dotenv = require('dotenv');
// dotenv.config();
// var MeaningCloud = require('meaning-cloud');
// var meaning = MeaningCloud({
//     application_key:process.env.API_KEY
//     // key: "b3599e15cab6fb12641a2e2456650278" 
// });
// console.log(`Your API key is ${process.env.API_KEY}`);



var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()


//Middle ware
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const fetch = require("node-fetch");


// Initialize the dist folder
app.use(express.static('dist'))
console.log(__dirname)
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Post Route
//blog: http://www.alltheprettypandas.com
app.post('/body', async function(req, res) {
    // console.log('body: ', req.body);
    const data = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=b3599e15cab6fb12641a2e2456650278&lang=auto&of=json&url=${req.body.url}`);
    // console.log("data: ", data);
    try {
        // Transform into JSON
        const MeaningData = await data.json();
        console.log("MeaningData: ", MeaningData);
        res.send(MeaningData)
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
});
//example: https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/examples


// designates what port the app will listen to for incoming requests
const PORT = process.env.PORT || 8080;
app.listen(8080, function () {
    console.log(`App is listening on port ${PORT}!`)
})
