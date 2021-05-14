let mongoose=require('mongoose');
//create schema (structure)
let userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true},
    uid:{type:String,unique:true},
    pass: {type:String,required:true},
    created_at:{type:Date,default:Date.now()}
  });

  //model
  module.exports = mongoose.model('user', userSchema);
//end