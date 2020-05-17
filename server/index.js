require("dotenv").config();
const { SERVER_PORT } = process.env;
const express = require("express");
const app = express();
const { addPath, getPaths, editPath, deletePath } = require('./controller')

app.use(express.json());

//endpoints
app.post("/api/newPath", addPath);
app.get("/api/paths", getPaths);
app.put('/api/edit', editPath)
app.put('/api/delete', deletePath)
  

app.listen(SERVER_PORT, () =>
  console.log(`Servin' up some 🔥 🔥 🔥 on Port ${SERVER_PORT}`)
);
