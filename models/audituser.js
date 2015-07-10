 var mongoose = require('mongoose')
 var Schema = mongoose.Schema
 var Audituser = new Schema({
     auditname : String,
     avatarUrl: String
 });
 module.exports = Audituser;