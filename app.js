var express = require('express');
const cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');// to parse a post request
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.options('*', cors());
app.get('/', function (req, res) {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 9001
 // don't have connection settings in here because we push// var connection = mysql.createConnection(connectionSettings);

let globalVar = 1

app.get('/', function (req, res) {
  let alternateResponse = {test: 1,
    jordan:2,
    arr: [1,2,3]
  }
  res.send(alternateResponse);
});

app.get('/increment', function (req, res) {
  //globalVar++;
  res.send(`Global var is ${globalVar++}`);
});

app.get('/randomNumber', function (req, res) {
  let random = Math.random()
  res.send({number:random})
});

app.get('/testEndpoint', function (req, res) {
  res.send("YOU DID IT jeff")
});


app.listen(PORT, function () {
  console.log(`Node server started listening on port ${PORT}`);
});
