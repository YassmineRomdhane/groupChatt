const Messages = require("../models/Messages.js");

const messages = {
  getAllMessages: async (req, res) => {
    try {
      let messages = await Messages.find({});
      res.send(messages);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },


  sendMessage: async (req, res) => {
  try {
      const newMessageSent = new Messages(req.body);
      
      await newMessageSent.save();
      res.send({ message: "Message sent!" });
    } catch (err) {
      console.log("error sent from sending private message ==>", err);
      res.send(err);
    }
  },
  getUserMessage: async (req, res) => {
    try {
      var data = await Messages.find({room:req.params.room});
      res.send(data);
    } catch (err) {
      console.log("err", err);
    }
  },
  

};
module.exports = messages;