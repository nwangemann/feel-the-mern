require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const { SERVER_PORT, CONNECTION_STRING } = process.env
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

// listingCtrl Endpoints
// app.post('/api/save', saveThing);
// app.delete('/api/delete/:id', deleteThing);

MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database')
    const db = client.db('paths')
    const pathsCollection = db.collection('paths')
    app.post('/api/newPath', (req, res) => {
        pathsCollection.insertOne(req.body)
          .then(result => {
            console.log(result)
            res.status(200).send(result)
          })
          .catch(error => console.error(error))
      })
    app.get('/api/paths', (req, res) => {
        db.collection('paths').find().toArray()
         .then(results => {
            console.log(results)
            res.status(200).send(results)
        }).catch(error => console.error(error))
    })
}).catch(e => console.log(e))


app.listen(SERVER_PORT, () => console.log(`Servin' up some 🔥 🔥 🔥 on Port ${SERVER_PORT}`));