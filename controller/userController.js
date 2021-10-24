const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const UserDetails = require("../model/userDetails");

exports.setUser = (req, res, next) => {
  const err = validationResult(req);

  if (err) {
    return res.send(err);
  }

  bcrypt
    .hash(req.query.password, 10)
    .then((hashedPassword) => {
      const userData = new UserDetails({
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        password: hashedPassword,
        city: req.query.city,
        state: req.query.state,
        mailID: req.query.mailID,
      });
      return userData.save();
    })
    .then((result) => {
      console.log("successful");
      res.send("Successful");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  UserDetails.findOne({ mailID: req.query.mailID })
    .then((user) => {
      if (!user) {
        return res.send("Please enter correct MailID");
      }
      return bcrypt.compare(req.query.password, user.password);
    })
    .then((data) => {
      if (!data) {
        return res.send("Please enter correct Password");
      }
      res.send("Login Successful");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.query.id;
  UserDetails.findOneAndUpdate({ _id: id })
    .then((user) => {
      user.isDeleted = true;
      return user.save();
    })
    .then((data) => {
      res.send("Data Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateUser = (req, res, next) => {
  const id = req.query.id;
  UserDetails.findOneAndUpdate({ _id: id })
    .then((user) => {
      user.firstName = req.query.firstName;
      user.lastName = req.query.lastName;
      user.city = req.query.city;
      user.state = req.query.state;
      return user.save();
    })
    .then((data) => {
      res.send("Data updated!!!");
    })
    .catch((err) => {
      console.log(err);
    });
};
