require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const MOVIES = require("./movies.json");
const app = express();

console.log(process.env.API_TOKEN);

app.use(morgan("common"));

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
});

app.get("/movie", function handleGetMovies(req, res) {
  res.send("Movie Search API");
});

app.listen(8000, () => {
  console.log("Server is listening at http://localhost:8000");
});
