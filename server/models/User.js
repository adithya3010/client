const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "admin", "hr", "doctor"], required: true },
  firstName: String,
  lastName: String,
  dob: Date,
  // HR-specific
  companyName: String,
  hrName: String,
  established: Date,
  address: String,
  size: Number,
  // Doctor-specific
  specialization: String,
  experience: Number,
  documents: String, // file path
  timings: String,
  // Auth
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

module.exports = mongoose.model("User", UserSchema);