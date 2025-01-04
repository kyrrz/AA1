const express = require("express");
const router = express.Router();

const {
  getDevs,
  getDev,
  postDev,
  putDev,
  deleteDev,
} = require("../controller/devsController.js");

router.get("/devs", getDevs);
router.get("/devs/:dev", getDev);
router.post("/devs", postDev);
router.put("/devs/:dev", putDev);
router.delete("/devs/:dev", deleteDev);

module.exports = router;
