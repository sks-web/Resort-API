const ResortDetails = require("../model/resortDetails");
const ResortFeedback = require("../model/resortFeedback");

exports.getAllResort = (req, res, next) => {
  ResortDetails.find()
    .populate({ path: "feedback", populate: { path: "user" } })
    .then((resortData) => {
      res.status(200).json({ success: true, data: resortData });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addNewResort = (req, res, next) => {
  console.log(req.body.mapLocation);
  const resortDetails = new ResortDetails({
    name: req.body.name,
    description: req.body.description,
    address: {
      location: req.body.location,
      state: req.body.state,
      city: req.body.city,
      pin: req.body.pin,
      mapLocation: {
        lat: req.body.mapLocation.lat,
        lon: req.body.mapLocation.lon,
      },
    },
  });
  resortDetails
    .save()
    .then((response) => {
      console.log(response);
      res.json({ success: true, data: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.uploadImage = (req, res, next) => {
  const id = req.params.id;
  const path = req.file.path;
  ResortDetails.findByIdAndUpdate({ _id: id })
    .then((resortData) => {
      if (!resortData) {
        return res.json({ success: false, data: "No resort found." });
      }
      resortData.image.push(path);
      return resortData.save();
    })
    .then((value) => {
      res.json({ success: true, data: value });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateResortDetails = (req, res, next) => {
  const id = req.params.id;
  ResortDetails.findByIdAndUpdate({ _id: id })
    .then((resortData) => {
      if (!resortData) {
        return res.json({ success: false, data: "No data found." });
      }
      resortData.name = req.body.name;
      resortData.description = req.body.description;
      resortData.location = req.body.location;
      resortData.state = req.body.state;
      resortData.city = req.body.city;
      resortData.pin = req.body.pin;
      return resortData.save();
    })
    .then((data) => {
      res.json({ sucess: true, data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteResorts = (req, res, next) => {
  console.log(req.params.id);
};

exports.addReviews = async (req, res, next) => {
  console.log(req.params.resortId, req.params.userId, req.body);
  const resort = await ResortDetails.findById(req.params.resortId);
  const feedback = new ResortFeedback({
    ...req.body,
    user: req.params.userId,
  });
  feedback
    .save()
    .then((response) => {
      console.log(response);
      resort.feedback.push(response._id);
      return resort.save();
    })
    .then((data) => {
      res.json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
    });
};
