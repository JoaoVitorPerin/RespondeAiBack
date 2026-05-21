const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");

const {
  getKnowledge,
  createKnowledge,
  deleteKnowledge,
  updateKnowledge
} = require("../controllers/knowledge.controller");

router.get("/:politicianId", auth, getKnowledge);

router.post("/:politicianId", auth, createKnowledge);

router.delete("/:id/:politicianId", auth,deleteKnowledge);

router.put("/:id", auth, updateKnowledge);

module.exports = router;