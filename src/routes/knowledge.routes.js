const express = require("express");

const router = express.Router();

const {
  getKnowledge,
  createKnowledge,
  deleteKnowledge,
  updateKnowledge
} = require("../controllers/knowledge.controller");

router.get("/:politicianId", getKnowledge);

router.post("/:politicianId", createKnowledge);

router.delete("/:id/:politicianId", deleteKnowledge);

router.put("/:id", updateKnowledge);

module.exports = router;