let mongoose=require('mongoose');
//create schema (structure)
let feedbackSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    subject:{type:String,required:true},
    message: {type:String,required:true},
    created_at:{type:Date,default:Date.now()}
  });

  //model
  module.exports = mongoose.model('feedback', feedbackSchema);
//end