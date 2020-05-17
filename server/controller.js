require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const MongoClient = require("mongodb").MongoClient;

module.exports = {
  getPaths: (req, res) => {
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then((client) => {
        console.log("Connected to Database");
        const db = client.db("paths");
        db.collection("paths")
          .find()
          .toArray()
          .then((results) => {
            console.log(results);
            res.status(200).send(results);
          })
          .catch((error) => console.error(error));
      })
      .catch((e) => console.log(e));
  },
  addPath: (req, res) => {
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then((client) => {
        console.log("Connected to Database");
        const db = client.db("paths");
        const pathsCollection = db.collection("paths");
        pathsCollection
          .insertOne(req.body)
          .then((result) => {
            db.collection("paths")
              .find()
              .toArray()
              .then((results) => {
                res.status(200).send(results);
              })
              .catch((e) => console.log(e));
          })
          .catch((error) => console.error(error));
      })
      .catch((e) => console.log(e));
  },
  editPath: (req, res) => {
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then((client) => {
        console.log("Connected to Database");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        const db = client.db("paths");
        const pathsCollection = db.collection("paths");
        pathsCollection
          .findOneAndUpdate(
            { _id: ObjectID(req.body.id) },
            {
              $set: {
                path: req.body.pathToUpdate,
              },
            },
            {
              upsert: true,
            }
          )
          .then((result) => {
            db.collection("paths")
              .find()
              .toArray()
              .then((results) => {
                res.status(200).send(results);
              })
              .catch((e) => console.log(e));
          })
          .catch((error) => console.error(error));
      })
      .catch((e) => console.log(e));
  },
  deletePath: (req, res) => {
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then((client) => {
        console.log("Connected to Database");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        const db = client.db("paths");
        const pathsCollection = db.collection("paths");
        pathsCollection
          .deleteOne({ _id: ObjectID(req.body.id) })
          .then((result) => {
            db.collection("paths")
              .find()
              .toArray()
              .then((results) => {
                res.status(200).send(results);
              })
              .catch((e) => console.log(e));
          })
          .catch((error) => console.error(error));
      })
      .catch((e) => console.log(e));
  },
};
