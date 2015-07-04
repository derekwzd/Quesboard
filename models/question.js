 var mongoose = require('mongoose')
 var Schema = mongoose.Schema
 var ObjectId=Schema.ObjectId

 var Qusetion = new Schema({
     content:String,
     creator:{
     	_id:ObjectId,
     	email:String,
     	name:String,
     	avatarUrl: String
     },
     vote: Number,
     //0:closed,1:active
     qStatus:Number,
     sectionId:ObjectId,
     time:{
     	type:Date,
     	default:Date.now
     }
 });
 module.exports = Qusetion;