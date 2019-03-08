var express = require('express');
const cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');// to parse a post request

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.options('*', cors());

const PORT = process.env.PORT || 3000
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

app.post('/postScore', function (req, res) {
  let score = req.body.score
  connection.query("insert into scores (score) values (?)", score, function (err, result) {
    if (err) {
      res.send(err);
      return 
    }
    res.send("Successfully ran query");
  });
});

app.get('/highScores', function (req, res) {
  connection.query("SELECT score FROM `scores` ORDER BY score LIMIT 10", function (err, result) {
    if (err) {
      res.send(err);
      return 
    }
    res.send(result);
  });
});

app.get('/testEndpoint', function (req, res) {
  res.send("YOU DID IT244")
});


app.listen(PORT, function () {
  console.log('Node server started listening on port 6001');
});
