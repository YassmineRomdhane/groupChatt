const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/UserController");

router.post("/signup",userCtrl.register);
router.get("/users", userCtrl.getAll);
router.post("/login",userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/users/:id", userCtrl.getUserDataById);  




module.exports = router;