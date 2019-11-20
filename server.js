require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const MOVIES = require("./movies.json");
const app = express();

app.use(morgan("common"));
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
});

app.get("/movie", function handleGetMovies(req, res) {
  let results = MOVIES;
  if (req.query.genre) {
    results = results.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }
  if (req.query.country) {
    results = results.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }
  if (req.query.rating) {
    results = results.filter(movie => movie.avg_vote >= req.query.rating);
  }
  res.json(results);
});

app.listen(8000, () => {
  console.log("Server is listening at http://localhost:8000");
});
