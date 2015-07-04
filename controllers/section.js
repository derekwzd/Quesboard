var db=require('../models')
var async = require('async')


exports.createNewSection = function(section, callback){
	var section=new db.Section()
	section.content=section.content
	section.vote=0
	section.qStatus=1
	section.save(callback)
}

exports.deleteQuestion=function(_questionId,callback){
	db.Section.remove({
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