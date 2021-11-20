const mongoose = require("mongoose");

const { Schema } = mongoose;

const resortFeedbackSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "UserDetails" },
    stars: { type: Number, required: true },
    title: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResortFeedback", resortFeedbackSchema);
