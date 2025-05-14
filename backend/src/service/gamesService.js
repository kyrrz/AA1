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

const registerGame = async (gameName, gameGenre, gameYear, gameDev) => {
  const result = await db("games").insert({
    name: gameName,
    genre: gameGenre,
    year: gameYear,
    dev: gameDev,
  });
  return result;
};

const modifyGame = async (gameName, gameGenre, gameYear, gameDev) => {
  const result = await db("games")
    .where({
      name: gameName,
    })
    .update({
      genre: gameGenre,
      year: gameYear,
      dev: gameDev,
    });

  return result;
};

const removeGame = async (gameName) => {
  const result = await db("games").where({ name: gameName }).del();

  return result;
};

module.exports = {
  findAllGames,
  findGame,
  registerGame,
  modifyGame,
  removeGame,
};
