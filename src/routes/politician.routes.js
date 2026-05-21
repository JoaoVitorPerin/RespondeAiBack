const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");

const {
  getPolitician,
  updatePolitician
} = require("../controllers/politician.controller");

router.get("/:hash",  getPolitician);

router.put("/:id", auth, updatePolitician);

module.exports = router;