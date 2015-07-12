var db=require('../models')
var async = require('async')
var gravatar = require('gravatar')

exports.createNewAudit = function(name, img, callback){
			user =new db.User
			user.name = name
			//TODO:avatarurl
			user.flag= 0
			user.avatarUrl = img
			user.save()
			callback(null,user)	
}