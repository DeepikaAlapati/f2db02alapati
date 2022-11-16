var express = require('express');
var router = express.Router();

const Balloon_controllers = require('../controllers/Balloon');
/* GET home page. */
router.get('/',Balloon_controllers.Balloon_view_all_Page);



module.exports = router;
 