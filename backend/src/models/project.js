const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    blueprints: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blueprint",
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["planned", "ongoing", "completed"],
      default: "planned",
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
