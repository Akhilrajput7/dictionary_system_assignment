const mongoose =  require("mongoose");

//  schema -  word store in db
const wordSchema =  new mongoose.Schema({
   
  word:{
     type:String,
     required:true,
     unique:true,
     trim:true,
     lowercase:true,
  },
  frequency:{
     type:Number,
     default:1,
     min:0,
  }
});

module.exports =  mongoose.model("Word" , wordSchema);