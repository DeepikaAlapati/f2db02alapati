var express = require('express');
var Balloon_controller = require('../controllers/Balloon');
var router = express.Router();

// redirect to login. 
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 
router.get('/', Balloon_controller.Balloon_view_all_Page ); 
// GET request for one Balloon. 
router.get('/Balloon/:id', Balloon_controller.Balloon_detail);
/* GET detail Balloon page */ 
router.get('/detail', Balloon_controller.Balloon_view_one_Page); 
/* GET create Balloon page */ 
router.get('/create',secured, Balloon_controller.Balloon_create_Page); 
/* GET create update page */ 
router.get('/update',secured, Balloon_controller.Balloon_update_Page);
/* GET delete Balloon page */ 
router.get('/delete',secured, Balloon_controller.Balloon_delete_Page);
module.exports = router;