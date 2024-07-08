const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fs = require('node:fs');
const mysql = require("mysql");
const app = express();
const port = 3001;

app.use(cors());

app.listen(port, (_) => {
  console.log(` Server app listening on port ${port}`);
});
