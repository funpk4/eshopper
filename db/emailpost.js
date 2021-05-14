let mongoose=require('mongoose');
//create schema (structure)
let adminloginSchema = new mongoose.Schema({
    email:{type:String},
  });

  //model
  module.exports = mongoose.model('adminlogin', adminloginSchema);
//end