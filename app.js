var express = require('express');
const cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');// to parse a post request
var GifCreator = require('./gifCreator.js')
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

let  gifCreator = new GifCreator();

let books = []
class Book {
  constructor(title, pages){
    this.id = books.length
    this.title =title
    this.pages = pages

  }

  setTitle(newTitle){
    this.title = newTitle
  }

  setPages(newPages){
    this.pages = newPages
  }
}

app.post('/start-gif', function (req, res) {
 
  let width = req.body.width
  let height = req.body.height
  gifCreator.start(width, height);
  res.send('worked')
});

app.post('/add-frame', function (req, res) {
  let base64 = req.body.base64
  let delay = req.body.delay
 
  gifCreator.addFrame(base64, delay);
  res.send('worked')
});

app.post('/end-gif', function (req, res) {
  gifCreator.finish()
  res.send('worked')
});






let bookHP  = new Book("Harry Potter",789)
books.push(bookHP)
let bookDict  = new Book("Dictionary", 3000)
books.push(bookDict)

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
  res.status(400).send('YIKES LOOK WHAT YOU DID');
});

// Book Functions
// get a book by ID
app.get('/book/:id', function (req,res){
  let bookId = req.params.id
  let book = books[bookId]
  res.send(book);
})

// get title of a book
app.get('/book/:id/title', function (req,res){
  let bookId = req.params.id
  let book = books[bookId]
  res.send(book.title);
})

// change title of a book
app.patch('/book/:id/title', function (req,res){
  console.log(req.body)
  let bookId = req.params.id
  let book = books[bookId]
  book.setTitle(req.body.title)
  res.status(200).send("Changed title to "+ req.body.title);
})






app.listen(PORT, function () {
  console.log(`Node server started listening on port ${PORT}`);
});
