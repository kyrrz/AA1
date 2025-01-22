const express = require("express");
const router = express.Router();

const {
  getGames,
  getGame,
  postGame,
  putGame,
  deleteGame,
} = require("../controller/gamesController");

router.get("/", getGames);
router.get("/:game", getGame);
router.post("/", postGame);
router.put("/:game", putGame);
router.delete("/:game", deleteGame);

module.exports = router;
console.log("Game routes loaded");
