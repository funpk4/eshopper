const { ObjectId } = require('bson');
let mongoose=require('mongoose');
//create schema (structure)
var categorySchema = new mongoose.Schema({
    subcategory:[{subcategory:{type:String},_id:{type:ObjectId,default:ObjectId()},created_at:{type:Date,default:Date.now()}
    }],
  });

  //model
  module.exports = mongoose.model('category', categorySchema);
//end