require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const MOVIES = require("./movies.json");
const app = express();

app.use(morgan("common"));

app.get("/movie", function handleGetMovies(req, res) {
  res.json(MOVIES);
});

app.listen(8000, () => {
  console.log("Server is listening at http://localhost:8000");
});
