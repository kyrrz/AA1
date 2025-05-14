const express = require("express");
const {
  getDevs,
  getDev,
  postDev,
  putDev,
  deleteDev,
} = require("../controller/devsController");
const router = express.Router();

router.get("/", getDevs);
router.get("/:dev", getDev);
router.post("/", postDev);
router.put("/:dev", putDev);
router.delete("/:dev", deleteDev);

module.exports = router;
