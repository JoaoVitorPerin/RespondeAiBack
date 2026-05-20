const express = require("express");

const router = express.Router();

const {
  getPolitician,
} = require("../controllers/politician.controller");

router.get("/:hash", getPolitician);

// router.post("/:hash", createPolitician);

// router.delete("/:hash", deletePolitician);

// router.put("/:hash", updatePolitician);

module.exports = router;