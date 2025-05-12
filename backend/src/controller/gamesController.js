const { ExpressValidator } = require("express-validator");
const {
  findAllGames,
  findGame,
  registerGame,
  modifyGame,
  removeGame,
} = require("../service/gamesService");

//Operacion que devuelve todos los devs de la BBDD

const getGames = async (req, res) => {
  const data = await findAllGames();

  res.status(200).json(data);
};

//Operacion que devuelve un juego determinado

const getGame = async (req, res) => {
  const data = await findGame(req.params.game);

  res.status(200).json(data);
};

//Operacion que registra un juego nuevo

const postGame = async (req, res) => {
  if (req.body.name === undefined || req.body.name === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Game name is required",
    });
    return;
  }

  if (req.body.genere === undefined || req.body.genere === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Game genre is required",
    });
    return;
  }

  if (req.body.year === undefined || req.body.year === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Game year is required",
    });
    return;
  }

  if (req.body.dev === undefined || req.body.dev === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Game dev is required",
    });
    return;
  }
  await registerGame(
    req.body.name,
    req.body.genere,
    req.body.year,
    req.body.dev
  );

  res.status(201).json({
    status: "created",
    message:
      "Game created: " +
      req.body.name +
      req.body.genere +
      req.body.year +
      req.body.dev,
  });
};

//Operacion que modifica los datos de un juego en la BBDD

const putGame = async (req, res) => {
  if (req.body.game === undefined || req.body.game === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Game name is required",
    });
    return;
  }

  if (req.body.genere === undefined || req.body.genere === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Game genre is required",
    });
    return;
  }

  if (req.body.year === undefined || req.body.year === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Game year is required",
    });
    return;
  }

  if (req.body.dev === undefined || req.body.dev === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Game dev is required",
    });
    return;
  }

  await modifyGame(
    req.params.game,
    req.body.genere,
    req.body.year,
    req.body.dev
  );

  res.status(204).json({
    status: "modified",
    message:
      "Game modified: " +
      req.body.game +
      req.body.genere +
      req.body.year +
      req.body.dev,
  });
};

//Operacion que elimina un juego de la BBDD

const deleteGame = async (req, res) => {


  await removeGame(req.params.game);

  res.status(204).json({});
};

module.exports = {
  getGames,
  getGame,
  postGame,
  putGame,
  deleteGame,
};
console.log("Game controller loaded");
