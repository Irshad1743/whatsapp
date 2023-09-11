const express = require("express");
const { sendMessage, getUserMessage } = require("../controllers/messageControllers");
const { isAuthUser } = require("../middleware/auth");
const router = express.Router();

router.post("/sendmessage", isAuthUser, sendMessage);
router.post("/getusermessage", isAuthUser, getUserMessage);

module.exports = router;