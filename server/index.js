require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const { SERVER_PORT, CONNECTION_STRING } = process.env
const { newPath } = require('./controller')
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

// listingCtrl Endpoints
// app.post('/api/save', saveThing);
// app.delete('/api/delete/:id', deleteThing);

MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database')
    const db = client.db('songs')
    const quotesCollection = db.collection('filePaths')
    app.post('/api/newPath', newPath)
}).catch(e => console.log(e))

app.listen(SERVER_PORT, () => console.log(`Servin' up some 🔥 🔥 🔥 on Port ${SERVER_PORT}`));