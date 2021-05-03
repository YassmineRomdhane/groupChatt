const Groups = require("../models/Groups");

module.exports = {
  addGroup: async (req, res) => {
    const group = new Groups({
      name: req.body.name,
      description: req.body.description,
    
    });
    try {
        const check = await Groups.find(
           { name: req.body.name});
    
          if (check.length) {
            return res.send({ data: "NAME EXISTS" });
          }
      const savedGroup = await group.save();
      res.json(savedGroup);
    } catch (err) {
      res.json({ message: err });
    }
  },

  getGroups: async (req, res) => {
    try {
      const groups = await Groups.find({});
      res.send(groups);
    } catch (error) {
      console.log(error);
    }
  },

//   getGroupsbyUserId: async (req, res) => {
//     try {
//       const groups = await Groups.find({userId:req.params.id});
//       res.send(groups);
//     } catch (error) {
//       console.log(error);
//     }
//   },


};