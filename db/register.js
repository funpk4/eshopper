let mongoose=require('mongoose');
//create schema (structure)
var userSchema = new mongoose.Schema({
    name:{fname:{type:String},lname:{type:String}},
    phone:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    age:{type:String},
    gender:{type:String},
    created_at:{type:Date,default:Date.now()},
    lastlogin_at:{type:Date,default:Date.now()}

  });

  //model
  module.exports = mongoose.model('user', userSchema);
//end