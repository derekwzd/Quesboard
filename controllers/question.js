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

exports.getAllQuestions=function(_sectionId,callback){
	db.Section.find({
		sectionId:_sectionId
	},null,{
		sort:{
			'vote':-1
		},
		limit:20
	},callback)
}