const express = require("express");
const app = express();
const cors = require("cors");
const port = 8001;
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");

require("./db/conn");
const router = require("./Routes/router");

<<<<<<< HEAD

app.use( bodyParser.json({limit:"50mb"}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit:"50mb",
  extended: true
})); 
// app.use(express.json({}))
app.use(cors())
=======
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
>>>>>>> 6af1cc9e96d11abcfcbe0fcb190e19cd37b628e2

// middel ware
app.use(router);

app.listen(port, () => {
  console.log("connected");
});
