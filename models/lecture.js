 var mongoose = require('mongoose')
 var Schema = mongoose.Schema
 var ObjectId=Schema.ObjectId

 var Lecture = new Schema({
     boardID:Number,
     name:String,
     content:String,
     creator:{
     	_id:ObjectId,
     	email:String,
     	name:String,
     	avatarUrl: String
     },
     qrUrl:String,
     totalVote: Number,
     totalQuestion:Number,
     totalSection:Number,
     //0:closed,1:active
     lStatus:Number,
     time:{
     	type:Date,
     	default:Date.now
     }
 });
 module.exports = Lecture;