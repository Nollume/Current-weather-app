const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/current-weather", (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.API_KEY}&units=metric`,
  };
  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/place-weather", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${req.query.search}&limit=1&appid=${process.env.API_KEY}`
    );

    res.json(response.data);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
