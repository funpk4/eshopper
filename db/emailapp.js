let mongoose=require('mongoose');
//create schema (structure)
let emailSchema = new mongoose.Schema({
    email:{type:String},
    created_at:{type:Date,default:Date.now()}
  });

  //model
  module.exports = mongoose.model('email', emailSchema);
//end