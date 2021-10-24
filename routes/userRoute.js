const express = require("express");
const { query } = require("express-validator");

const userController = require("../controller/userController");

const router = express.Router();

router.post(
  "/saveUser",
  query("firstName")
    .isLength({ min: 3 })
    .withMessage("Firstname should contain more then 3 letter"),
  query("lastName")
    .isLength({ min: 3 })
    .withMessage("Lastname should contain more then 3 letter"),
  query("city")
    .isLength({ min: 3 })
    .withMessage("City should contain more then 3 letter"),
  query("state")
    .isLength({ min: 3 })
    .withMessage("State should contain more then 3 letter"),
  query("mailID").isEmail().withMessage("Invalid Mail"),
  userController.setUser
);

router.post("/login", userController.getUser);

router.put("/deleteUser", userController.deleteUser);

router.put("/updateUser", userController.updateUser);

module.exports = router;
