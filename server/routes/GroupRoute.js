const express = require('express');
const router = express.Router();
const groupsControllers=require("../controllers/groupsController")

router.get('/getAll',groupsControllers.getGroups);
router.post('/addGroup', groupsControllers.addGroup);
// router.post('/:gid', controllers.addMember);
// router.get('/:id', groupsControllers.getGroupsbyUserId);





module.exports = router;