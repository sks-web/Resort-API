const mongoose = require("mongoose");

const { Schema } = mongoose;

const resortSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    location: {
      type: String,
      required: true,
    },
    mapLocation: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pin: {
      type: Number,
      required: true,
    },
  },
  image: [String],
  feedback: [{ type: Schema.Types.ObjectId, ref: "ResortFeedback" }],
});

module.exports = mongoose.model("ResortDetails", resortSchema);
