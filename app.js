const express = require("express");
const app = express();
const cors = require("cors");
const port = 8001;
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");

require("./db/conn");
const router = require("./Routes/router");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

// middel ware
app.use(router);

app.listen(port, () => {
  console.log("connected");
});
