const express = require("express");
const app = express();
const pool = require("./db");

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
});

app.use(express.json()) // => req.body