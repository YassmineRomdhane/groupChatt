const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    messageBody: { type: String, required: true },
    userId: { type: String},
    room: {type:String},
    
 },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messageSchema);

module.exports = Messages; 