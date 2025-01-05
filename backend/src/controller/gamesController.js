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
  await registerGame(
    req.body.name,
    req.body.genere,
    req.body.year,
    req.body.dev
  );

  res.status(201).json({});
};

//Operacion que modifica los datos de un juego en la BBDD

const putGame = async (req, res) => {
  await modifyGame(
    req.params.game,
    req.body.genere,
    req.body.year,
    req.body.dev
  );

  res.status(204).json({});
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
