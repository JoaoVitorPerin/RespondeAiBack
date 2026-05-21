const express = require("express");

const router = express.Router();

const {
  getMessages,
  createMessage
} = require("../controllers/message.controller");

router.get("/:phone/:idPolitician", getMessages);

router.post("/enviar", createMessage);

module.exports = router;