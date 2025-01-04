const express = require("express");
const router = express.Router();

const {
  getGames,
  getGame,
  postGame,
  putGame,
  deleteGame,
} = require("../controller/gamesController.js");

router.get("/games", getGames);
router.get("/games/:game", getGame);
router.post("/games", postGame);
router.put("/games/:game", putGame);
router.delete("/games/:game", deleteGame);

module.exports = router;
