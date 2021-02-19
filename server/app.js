const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));



const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'movies';
var db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db(dbName)
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)

});

app.get('/saved', (req, res) => {
  let items;
  (async () => {
    items = await db.collection('items').find().toArray();
    res.status(200).send(items);
  })()
});

app.get('/lastSearch', (req, res) => {
  let last;
  (async () => {
    last = await db.collection('lastSearch').find().toArray();
    res.status(200).send(last);
  })()
});

app.post('/lastSearch', (req, res) => {
  (async () => {
    await db.collection('lastSearch').deleteMany({});
    await db.collection('lastSearch').insertMany(req.body);
    res.status(200).send('added last search');
  })()
});

app.post('/saved', (req, res) => {
  (async () => {
    await db.collection('items').insertOne(req.body);
    res.status(201).send(`added item: ${JSON.stringify(req.body)}`);
  })()
});

app.delete('/saved', (req, res) => {
  (async () => {
    await db.collection('items').deleteOne({ id: req.body.id });
    res.status(201).send(`deleted item: ${req.body.id}`);
  })()
});



module.exports = app;
