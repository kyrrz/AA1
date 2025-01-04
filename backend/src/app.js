const express = require("express");

const games = require("./route/gamesRoute.js");
const devs = require("./route/devsRoute.js");

const app = express();

app.use(express.json());

app.use("/", games);
app.use("/", devs);

app.listen(8080, () => {
  console.log("Iniciando backend");
});
