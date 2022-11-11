var Balloon = require('../models/Balloon'); 

// List of all Balloons 
exports.Balloon_list = async function(req, res) { 
    try{ 
        theBalloons = await Balloon.find(); 
        res.send(theBalloons); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

exports.Balloon_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await Balloon.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };


// for a specific Balloon. 
//exports.Balloon_detail = function(req, res) { 
  //  res.send('NOT IMPLEMENTED: Balloon detail: ' + req.params.id); 
//}; 

// Handle Balloon create on POST. 
//exports.Balloon_create_post = function(req, res) { 
  //  res.send('NOT IMPLEMENTED: Balloon create POST'); 
//}; 

// Handle Balloon delete form on DELETE. 
exports.Balloon_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: Balloon delete DELETE ' + req.params.id); 
}; 

// Handle Balloon update form on PUT. 
exports.Balloon_update_put = async function(req, res) { 
   // res.send('NOT IMPLEMENTED: Balloon update PUT' + req.params.id); 
   console.log(`update on id ${req.params.id} with body
   ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await Balloon.findById( req.params.id)
    // Do updates of properties
    if(req.body.balloon_color)
    toUpdate.balloon_color = req.body.balloon_color;
    if(req.body.balloon_type) toUpdate.balloon_type = req.body.balloon_type;
    if(req.body.balloon_size) toUpdate.balloon_size = req.body.balloon_size;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
   failed`);
    }
}; 
// VIEWS 
// Handle a show all view 
exports.Balloon_view_all_Page = async function(req, res) { 
    try{ 
        theBalloons = await Balloon.find(); 
        res.render('balloon', { title: 'Balloon Search Results', bal_results: theBalloons }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

exports.Balloon_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new Balloon(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    document.balloon_color = req.body.balloon_color; 
    document.balloon_type = req.body.balloon_type; 
    document.balloon_size = req.body.balloon_size; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 