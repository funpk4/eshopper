let mongoose=require('mongoose');
//create schema (structure)
let adminSchema = new mongoose.Schema({
    fname:{type:String,required:true},
    username:{type:String,unique:true},
    email:{type:String,required:true},
    state:{type:String,required:true},
    add:{type:String,required:true},
    pass:{type:String,required:true},
    created_at:{type:Date,default:Date.now()}
  });

  //model
  module.exports = mongoose.model('admin', adminSchema);
//end