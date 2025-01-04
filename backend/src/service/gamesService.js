const db = require("../../knexfile.js").db;

const findAllGames = async () => {
  const result = await db("vapor").select("*").from("games");
  return result;
};

const findGame = async () => {
  const result = await db("vapor")
    .select("*")
    .from("games")
    .where({ name: gameName })
    .first();
  return result;
};

const registerGame = async (gameName, gameGenere, gameYear, gameDev) => {
  const result = await db("vapor").insert({
    name: gameName,
    genere: gameGenere,
    year: gameYear,
    dev: gameDev,
  });
  return result;
};

const modifyGame = async (gameName, gameGenere, gameYear, gameDev) => {
  const result = await db("vapor")
    .where({
      name: gameName,
    })
    .update({
      genere: gameGenere,
      year: gameYear,
      dev: gameDev,
    });

  return result;
};

const removeGame = async (gameName) => {
  const result = await db("vapor")
    .del()
    .from("games")
    .where({ name: gameName });

  return result;
};

module.exports = {
  findAllGames,
  findGame,
  registerGame,
  modifyGame,
  removeGame,
};
