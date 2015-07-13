var db=require('../models')
var async = require('async')
var gravatar = require('gravatar')


exports.voteQues = function(_userId, quesid, callback){
	db.User.findOneAndUpdate({
		_id:_userId
	},{
		$push:{
			voted : quesid
		}
	}, callback)
} 

exports.unvoteQues = function(_userId, quesid, callback){
	db.User.findOneAndUpdate({
		_id:_userId
	},{
		$pull:{
			voted : quesid
		}
	}, callback)
}


exports.getAllVote = function(_userId, callback) {
    // _userId = 
    db.User.findOne({
        _id: _userId
    }, function(err, user) {
        if (err) {
            callback(err)
        }else{
        	callback(null, user.voted)
        }
    })
}



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

exports.findRegEmail = function(email, callback){
	db.User.findOne({
		email:email
	}, function(err, user){
		if(user){
			callback("reg", user)
		}else{
			return callback(null) 
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





