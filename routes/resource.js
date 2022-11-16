var express = require('express'); 
var router = express.Router(); 

// Require controller modules. 
var api_controller = require('../controllers/api'); 
var Balloon_controller = require('../controllers/Balloon'); 

/// API ROUTE /// 

// GET resources base. 
router.get('/', api_controller.api); 

/// Balloon ROUTES /// 

// POST request for creating a Balloon.  
router.post('/Balloon', Balloon_controller.Balloon_create_post); 

// DELETE request to delete Balloon. 
router.delete('/Balloon/:id', Balloon_controller.Balloon_delete); 

// PUT request to update Balloon. 
router.put('/Balloon/:id', Balloon_controller.Balloon_update_put); 

// GET request for one Balloon. 
router.get('/Balloon/:id', Balloon_controller.Balloon_detail); 

// GET request for list of all Balloon items. 
router.get('/Balloon', Balloon_controller.Balloon_list); 


/* GET detail costume page */ 
router.get('/detail', Balloon_controller.Balloon_view_one_Page); 


/* GET create dish page */ 
router.get('/create', Balloon_controller.Balloon_create_Page); 

/* GET dish update page */ 
router.get('/update', Balloon_controller.Balloon_update_Page); 

/* GET delete dish page */ 
router.get('/delete', Balloon_controller.Balloon_delete_Page); 
 

module.exports = router; 