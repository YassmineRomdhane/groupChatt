const express = require("express");
const router = express.Router();

const messagesController = require("../controllers/messagesController.js");

router.get("/getMessages", messagesController.getAllMessages);
router.post("/sendMessage", messagesController.sendMessage);
router.get("/getMessages/:room",messagesController.getUserMessage);
module.exports = router;
