const express = require("express");

const router = express.Router();

const {
  getPolitician,
  updatePolitician
} = require("../controllers/politician.controller");

router.get("/:hash", getPolitician);

router.put("/:id", updatePolitician);

module.exports = router;