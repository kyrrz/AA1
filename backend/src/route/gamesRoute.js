const express = require("express");
const {
  getGames,
  getGame,
  postGame,
  putGame,
  deleteGame,
} = require("../controller/gamesController");
const router = express.Router();

router.get("/", getGames);
router.get("/:game", getGame);
router.post("/", postGame);
router.put("/:game", putGame);
router.delete("/:game", deleteGame);

module.exports = router;
