const {
  findAllGames,
  findGame,
  registerGame,
  modifyGame,
  removeGame,
} = require("../service/gamesService");
const { findDev } = require("../service/devsService");

//Operacion que devuelve todos los devs de la BBDD

const getGames = async (req, res) => {
  const data = await findAllGames();

  res.status(200).json(data);
};

//Operacion que devuelve un juego determinado

const getGame = async (req, res) => {
  const data = await findGame(req.params.game);
  if (data === undefined) {
    res.status(404).json({
      status: "not-found",
      message: "Game not found",
    });
    return;
  }

  res.status(200).json(data);
};

//Operacion que registra un juego nuevo

const postGame = async (req, res) => {
  const gameExists = await findGame(req.body.name);
  if (gameExists) {
    res.status(409).json({
      status: "conflict",
      message: "Game already exists",
    });
    return;
  }
  if (req.body.name === undefined || req.body.name === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Game name is required",
    });
    return;
  }

  if (req.body.genre === undefined || req.body.genre === "") {
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
  const dev = await findDev(req.body.dev);

  if (!dev) {
    res.status(404).json({
      status: "not-found",
      message: "Dev not found",
    });
    return;
  }

  await registerGame(
    req.body.name,
    req.body.genre,
    req.body.year,
    req.body.dev
  );

  res.status(201).json({
    name: req.body.name,
    genre: req.body.genre,
    year: req.body.year,
    dev: req.body.dev,
    status: "created",
  });
};

//Operacion que modifica los datos de un juego en la BBDD

const putGame = async (req, res) => {
  if (req.params.game === undefined || req.params.game === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Game name is required",
    });
    return;
  }

  if (req.body.genre === undefined || req.body.genre === "") {
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

  const dev = await findDev(req.body.dev);

  if (!dev) {
    res.status(404).json({
      status: "not-found",
      message: "Dev not found",
    });
    return;
  }

  await modifyGame(
    req.params.game,
    req.body.genre,
    req.body.year,
    req.body.dev
  );

  res.status(200).json({
    name: req.body.name,
    genre: req.body.genre,
    year: req.body.year,
    dev: req.body.dev,
    status: "modified",
  });
};

//Operacion que elimina un juego de la BBDD

const deleteGame = async (req, res) => {
  const removed = await removeGame(req.params.game);
  if (!removed) {
    res.status(404).json({
      status: "not-found",
      message: "Game not found",
    });
    return;
  }

  res.status(204).json();
};

module.exports = {
  getGames,
  getGame,
  postGame,
  putGame,
  deleteGame,
};
