const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const UserDetails = require("../model/userDetails");

exports.setUser = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(200).json(err);
  }

  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const userData = new UserDetails({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        city: req.body.city,
        state: req.body.state,
        mailID: req.body.mailID,
      });
      return userData.save();
    })
    .then((result) => {
      res.status(200).json({ success: result, data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.json(err);
  }
  UserDetails.findOne({ mailID: req.body.mailID })
    .then((user) => {
      if (!user) {
        return res.json({
          success: false,
          data: "Please enter correct mail ID",
        });
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((data) => {
      if (!data) {
        return res.json({
          success: false,
          data: "Please enter correct password.",
        });
      }
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  UserDetails.findOneAndDelete({ _id: id })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.json({ success: false, data: "no user found" });
      }
      res.status(200).send({ success: true, data: user });
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  UserDetails.findOneAndUpdate({ _id: id })
    .then((user) => {
      if (!user) {
        return res.json({ success: false, data: "No data found." });
      }
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.city = req.body.city;
      user.state = req.body.state;
      return user.save();
    })
    .then((value) => {
      res.status(200).json({ success: true, data: value });
    })
    .catch((err) => {
      console.log(err);
    });
};
