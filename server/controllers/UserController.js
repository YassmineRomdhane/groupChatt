const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const userCtrl = {
  // add a user account
  register: async (req, res) => {
      console.log("hello",req.body)
    try {
      const {
        userName,
        email,
        password,
        imageUrl,
      } = req.body;
      // check if the email or userName is exist or not
      const checkUsername = await Users.findOne({userName});
      const checkemail = await Users.findOne({email});

      if (checkUsername) {
        return res.status(400).json({ msg: "Username already exists" });
      }
      if (checkemail) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      // hash the password and save the account information
      const hashPassword = await bcrypt.hash(password.toString(), 10);
      const newUser = new Users({
        userName,
        email,
        password: hashPassword,
        imageUrl,
      });
      // generate a token for the user
      const token = jwt.sign({ id: newUser._id }, config.toString(), {
        expiresIn: 86400, // expires in 24 hours
      });
      await newUser.save();

      res.send({
        auth: true,
        token: token,
        success: "successfully registred",
        id: newUser._id,
        name: newUser.userName,
        greet: "Welcome",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.msg });
    }
  },
  // find all users that have an account
  getAll: async (req, res) => {
    try {
      const users = await Users.find({});
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },
//get User by Id
  getUserDataById: async (req, res) => {
    try {
      var data = await Users.findOne({ _id: req.params.id });
      res.send(data);
    } catch (err) {
      console.log("err", err);
    }
  },
//   login with an existing account
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // check if the user already exist or not
      let user = await Users.findOne({ email });
      if (!user) {
        return res.send({ err: "User Not exist" });
      }
      // compare the typed password with password saved for the user
      const isMatch = await bcrypt.compare(password.toString(), user.password);
      if (!isMatch) {
        return res.send({ err: "Incorrect password" });
      }
      // generate a token for the user
      const token = jwt.sign({ id: user._id }, config.secret.toString(), {
        expiresIn: 86400, // expires in 24 hours
      });
      await user.save();

      res.status(200).send({
        auth: true,
        token: token,
        success: "you are logged in successfully",
        id: user._id,
        name: user.userName,
        greet: "Welcome",
      });
    } catch (error) {
      console.log(error);
    }
  },
  //user Logout
  logout: async (req, res) => {
    res
      .status(200)
      .send({ auth: false, token: null, success: "you are logged out" });
  },
};

module.exports = userCtrl;
