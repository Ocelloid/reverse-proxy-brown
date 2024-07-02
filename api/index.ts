const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors({ origin: "*" }));

app.get(":endpoint([\\/\\w\\.-]*)", (req, res) => {
  let endpoint = process.env.API_URL + req.params.endpoint;
  let params = {};
  for (const [key, value] of Object.entries(req.query)) {
    params[key] = value;
  }
  axios
    .get(endpoint, { params: params })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(3030, () => {
  console.log("Реверс-прокси запущен на порту 3030!");
});

module.exports = app;
