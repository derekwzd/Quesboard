var mongoose = require('mongoose')
console.log(4)
var Schema = mongoose.Schema
console.log(5)
var User = new Schema({
    email:String,
    name : String,
    avatarUrl: String
});

console.log(6)
module.exports = User;
console.log(7)