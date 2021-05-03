const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String},
    userId: {type:String},
     },
  { timestamps: true }
);

const Groups = mongoose.model("Groups", groupSchema);

module.exports = Groups;