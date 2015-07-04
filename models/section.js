 var mongoose = require('mongoose')
 var Schema = mongoose.Schema
 var ObjectId=Schema.ObjectId

 var Section = new Schema({
     content:String,
     lectureId:ObjectId,
     sStatus:Date,
 });
 module.exports = Section;