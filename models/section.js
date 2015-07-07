 var mongoose = require('mongoose')
 var Schema = mongoose.Schema
 var ObjectId=Schema.ObjectId

 var Section = new Schema({
     content:String,
     lectureId:ObjectId,
     //0:closed,1:active
     sStatus:Number,
     time:{
     	type:Date,
     	default:Date.now
     }
 });
 module.exports = Section;