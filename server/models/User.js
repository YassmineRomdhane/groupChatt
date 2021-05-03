const mongoose = require("mongoose");

// schema for the user
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    repeatedPassword: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;