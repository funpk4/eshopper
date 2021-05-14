let mongoose=require('mongoose');
//create schema (structure)
var proSchema = new mongoose.Schema({
    pbrand:{type:String,required:true},
    pname:{type:String,unique:true},
    pqty:{type:Number,required:true},
    pcolor:{type:String,required:true},
    pspec:{type:Array,required:true},
    image: {type:String,required:true},
    created_at:{type:Date,default:Date.now()}
  });

  //model
  module.exports = mongoose.model('product', proSchema);
//end