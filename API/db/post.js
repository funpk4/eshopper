let mongoose=require('mongoose');
var postSchema = new mongoose.Schema({
    eventname:{type:String,unique:true},
    created_at:{type:Date,default:Date.now()}
  });

  //model
  module.exports = mongoose.model('post', postSchema);
//end