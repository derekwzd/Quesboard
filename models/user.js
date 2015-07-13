 var mongoose = require('mongoose')
 var Schema = mongoose.Schema
 var User = new Schema({
     email:String,
     avatarUrl: String,
     password:String,
     name : String,
     //0:audit,1:signupuser
     flag:Number,
     voted:Array
 });
 module.exports = User;
