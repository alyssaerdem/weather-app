const express = require("express");
const app = express();
const port = 3000;
const dir = `${__dirname}/public/html/`;
const axios = require("axios");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));

require("dotenv").config();

app.get("/", (req, res) => {
  res.sendFile(dir + "index.html");
});

app.get("/weather", (req, res) => {
  console.log(req.query.city);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&units=metric&appid=${process.env.API_KEY}`;
  axios
    .get(url)
    .then((response) => res.send(response.data))
    .catch((error) => {
      if (error.response) {
        console.log(error.response.status);
        res.sendStatus(error.response.status);
      }
    });

  // res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
