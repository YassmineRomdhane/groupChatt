const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  { 
    userName: { type: String, required: true },
    roomId: {type: String},
    imageUrl:{type:String},
    groupName:{type:String}
   },
  { timestamps: true }
);

const Members = mongoose.model("Members", memberSchema);

module.exports = Members;