const { ObjectId } = require('bson');
let mongoose=require('mongoose');
//create schema (structure)
var categorySchema = new mongoose.Schema({
    category:{type:String,unique:true},
    // image: {type:String,required:true},
    status: {type:String,required:true},
    created_at:{type:Date,default:Date.now()}
  });

  //model
  module.exports = mongoose.model('category', categorySchema);
//end