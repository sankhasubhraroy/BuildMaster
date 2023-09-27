const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blueprintSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    fileURL: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blueprint = mongoose.model("Blueprint", blueprintSchema);

module.exports = Blueprint;
