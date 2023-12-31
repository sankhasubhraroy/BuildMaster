const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      enum: [
        "ProjectManager",
        "Contractor",
        "Supervisor",
        "Engineer",
        "DocumentController",
        "Accountant",
        "Client",
        "Auditor",
        "Scheduler",
        "SafetyOfficer",
        "QualityControlInspector",
      ],
    },
    address: {
      country: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      pincode: {
        type: Number,
        trim: true,
      },
    },
    avatar: {
      type: String,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
