const express = require("express");

const router = express.Router();

const {
  getMessages,
  createMessage
} = require("../controllers/message.controller");

router.get("/:phone", getMessages);

router.post("/enviar", createMessage);

module.exports = router;