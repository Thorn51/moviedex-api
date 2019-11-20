const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

app.use((req, res) => {
  res.send("Movie Search API");
});

app.listen(8000, () => {
  console.log("Server is listening at http://localhost:8000");
});
