const express = require("express");
const router = express.Router();
const memberCtrl = require("../controllers/memberController");

router.post('/getAll',memberCtrl.getMembers);




module.exports = router;