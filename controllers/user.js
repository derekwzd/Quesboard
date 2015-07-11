var db=require('../models')
var async = require('async')
var gravatar = require('gravatar')

exports.findUserById = function (_userId, callback){
	db.User.findOne({
		_id:_userId
	},callback)
}

exports.findByEmail = function(email, callback){
	db.User.findOne({
		email:email
	}, function(err, user){
		if(user){
			callback(null, user)
		}else{
			return callback("err") 
		}
	})
}

exports.createNewUser = function(email,password, callback){
	db.User.findOne({
		email:email,
		password:password
	},function(err,user){
		if(user){
			//the email has registrated
			return callback("err")
		}
		else{
			user =new db.User
			user.name = email.split('@')[0]
			user.email = email
			user.password=password
			user.flag = 1
			//TODO:avatarurl
			user.avatarUrl = gravatar.url(email)
			user.save()
			callback(null,user)
		}
	})
}



