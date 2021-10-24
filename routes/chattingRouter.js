const express = require("express");

const chattingController = require("../controller/chattingController");

const router = express.Router();

router.get("/chattingDemo", chattingController.chattingDemo);

module.exports = router;
