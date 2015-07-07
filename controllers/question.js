var db=require('../models')
var async = require('async')

exports.createNewQuestion = function(question, callback){
	var question=new db.Question()
	question.content=question.content
	question.creator=question.creator
	question.sectionId=question.sectionId
	question.vote=0
	question.qStatus=1
	question.save(callback)
}

exports.deleteQuestion=function(_questionId,callback){
	db.Question.remove({
		_id:_questionId
	},callback)
}


exports.offQuestion=function(_questionId,callback){
	db.Question.findOneAndUpdate({
		_id:_questionId
	},{
		$set:{
			qStatus:0
		}
	},callback)
}

exports.onQuestion=function(_questionId,callback){
	db.Question.findOneAndUpdate({
		_id:_questionId
	},{
		$set:{
			qStatus:1
		}
	},callback)
}

exports.getAllQuestions=function(_sectionId,callback){
	db.Question.find({
		sectionId:_sectionId
	},null,{
		sort:{
			'vote':-1
		},
		limit:20
	},callback)
}

exports.getActiveQuestions=function(_sectionId,callback){
	db.Question.find({
		sectionId:_sectionId,
		qStatus:1
	},null,{
		sort:{
			'vote':-1
		},
		limit:20
	},callback)
}

exports.voteQuestions=function(_questionId,callback){
	db.Question.find({
		_id:_questionId
	},{
		$set:{
			vote:+1
		}
	},callback)
}

exports.unvoteQuestions=function(_questionId,callback){
	db.Question.find({
		_id:_questionId
	},{
		$set:{
			vote:-1
		}
	},callback)
}