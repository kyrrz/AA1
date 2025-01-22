const express = require("express");
const router = express.Router();

const {
  getDevs,
  getDev,
  postDev,
  putDev,
  deleteDev,
} = require("../controller/devsController");

router.get("/", getDevs);
router.get("/:dev", getDev);
router.post("/", postDev);
router.put("/:dev", putDev);
router.delete("/:dev", deleteDev);

module.exports = router;
console.log("Dev routes loaded");
