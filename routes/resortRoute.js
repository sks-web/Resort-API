const express = require("express");

const resortController = require("../controller/resortController");

const router = express.Router();

router.get("/", resortController.getAllResort);

router.post("/addNewResort", resortController.addNewResort);

router.put("/uploadImage", resortController.uploadImage);

router.put("/updateResortDetails", resortController.updateResortDetails);

module.exports = router;
