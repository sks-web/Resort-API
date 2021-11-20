const express = require("express");
const { body } = require("express-validator");

const resortController = require("../controller/resortController");

const router = express.Router();

router.get("/", resortController.getAllResort);

router.post("/addNewResort", resortController.addNewResort);

router.put("/uploadImage/:id", resortController.uploadImage);

router.put("/updateResortDetails/:id", resortController.updateResortDetails);

router.delete("/deleteResort/:id", resortController.deleteResorts);

router.put("/addReview/:resortId/:userId", resortController.addReviews);

module.exports = router;
