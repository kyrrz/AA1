const express = require("express");
const cors = require("cors");

const gamesRoute = require("./route/gamesRoute");
const devsRoute = require("./route/devsRoute");
const loginRoute = require("./route/loginRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/games", gamesRoute);
app.use("/devs", devsRoute);
app.use("/login", loginRoute);

app.get("/", (req, res) => {
  res.send(
    "Bienvenido al backend de la aplicación. Use /games o /devs para interactuar con la API."
  );
});

app.listen(8080, () => {
  console.log("Iniciando backend");
});
