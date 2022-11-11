const mongoose = require("mongoose") 
const balloonSchema = mongoose.Schema({ 
    balloon_color: String,
    balloon_type:String,
    balloon_size : Number,
}) 

module.exports = mongoose.model("Balloon", balloonSchema) 

