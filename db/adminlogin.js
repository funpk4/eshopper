let mongoose=require('mongoose');
//create schema (structure)
let adminSchema = new mongoose.Schema({
    fname:{type:String},
    username:{type:String,required:true},
    email:{type:String},
    state:{type:String},
    add:{type:String},
    pass: {type:String},
    created_at:{type:Date,default:Date.now()}
  });

  //model
  module.exports = mongoose.model('admin', adminSchema);
//end