const express = require("express");
const { body } = require("express-validator");

const userController = require("../controller/userController");
const UserDetails = require("../model/userDetails");

const router = express.Router();

router.post(
  "/saveUser",
  body("firstName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Firstname should contain more then 3 letter"),
  body("lastName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Lastname should contain more then 3 letter"),
  body("city")
    .trim()
    .isLength({ min: 3 })
    .withMessage("City should contain more then 3 letter"),
  body("state")
    .trim()
    .isLength({ min: 3 })
    .withMessage("State should contain more then 3 letter"),
  body("mailID")
    .trim()
    .isEmail()
    .withMessage("Please enter valid mail ID")
    .custom((value) => {
      return UserDetails.findOne({ mailID: value }).then((data) => {
        if (data) {
          return Promise.reject("Email already in use.");
        }
      });
    }),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must contact atleast 1 capital letter, 1 small letter, 1 special symbol and 1 number"
    ),
  body("confirmPassword").custom((value, { req }) => {
    if (req.body.password != value) {
      throw new Error("Confirm password and password are not same.");
    }
    return true;
  }),
  userController.setUser
);

router.post(
  "/login",
  body("mailID").not().isEmpty().withMessage("Please enter email"),
  body("password").not().isEmpty().withMessage("Please enter password"),
  userController.getUser
);

router.delete("/deleteUser/:id", userController.deleteUser);

router.put("/updateUser/:id", userController.updateUser);

module.exports = router;
