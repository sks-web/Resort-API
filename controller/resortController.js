const ResortDetails = require("../model/resortDetails");

exports.getAllResort = (req, res, next) => {
  ResortDetails.find()
    .then((resortData) => {
      res.send(resortData);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addNewResort = (req, res, next) => {
  const resortDetails = new ResortDetails({
    name: req.query.name,
    description: req.query.description,
    address: {
      location: req.query.location,
      state: req.query.state,
      city: req.query.city,
      pin: req.query.pin,
    },
  });
  resortDetails
    .save()
    .then((response) => {
      console.log(response);
      res.send("New Resort Added.");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.uploadImage = (req, res, next) => {
  const id = req.body.id;
  const path = req.file.path;
  ResortDetails.findByIdAndUpdate({ _id: id })
    .then((resortData) => {
      if (!resortData) {
        return res.send("No resort found.");
      }
      resortData.image.push(path);
      return resortData.save();
    })
    .then((data) => {
      res.send("Image uploaded");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateResortDetails = (req, res, next) => {
  const id = req.query.id;
  ResortDetails.findByIdAndUpdate({ _id: id })
    .then((resortData) => {
      resortData.name = req.query.name;
      resortData.description = req.query.description;
      resortData.location = req.query.location;
      resortData.state = req.query.state;
      resortData.city = req.query.city;
      resortData.pin = req.query.pin;
      return resortData.save();
    })
    .then((data) => {
      res.send("Data updated");
    })
    .catch((err) => {
      console.log(err);
    });
};
