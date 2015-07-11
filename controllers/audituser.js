var db=require('../models')
var async = require('async')
var gravatar = require('gravatar')

exports.createNewAudit = function(name, callback){
			user =new db.User
			user.name = name
			//TODO:avatarurl
			user.flag= 0
			user.avatarUrl = gravatar.url(name)
			user.save()
			callback(null,user)	
}
