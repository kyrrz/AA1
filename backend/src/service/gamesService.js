const db = require("../configuration/database").db;

const findAllGames = async () => {
  const result = await db("games").select("*");
  return result;
};

const findGame = async (gameName) => {
  const result = await db("games")
    .select("*")
    .where({ name: gameName })
    .first();
  return result;
};

const registerGame = async (gameName, gameGenere, gameYear, gameDev) => {
  const result = await db("games").insert({
    name: gameName,
    genere: gameGenere,
    year: gameYear,
    dev: gameDev,
  });
  return result;
};

const modifyGame = async (gameName, gameGenere, gameYear, gameDev) => {
  const result = await db("games")
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
  const result = await db("games").del().where({ name: gameName });

  return result;
};

module.exports = {
  findAllGames,
  findGame,
  registerGame,
  modifyGame,
  removeGame,
};

console.log("Game services loaded");
