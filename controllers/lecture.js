var db=require('../models')
var async = require('async')

exports.createNewLecture = function(lecture, callback){
	var lecture=new db.Lecture()
	lecture.boardID=lecture.boardID
	lecture.name=lecture.name
	lecture.content=lecture.content
	lecture.creator=lecture.creator
	lecture.qrUrl=lecture.qrUrl
	lecture.totalVote=0
	lecture.totalQuestion=0
	lecture.totalSection=0
	lecture.lStatus=1
	lecture.save(callback)
}

exports.deleteLecture=function(_lectureId,callback){
	db.Lecture.remove({
		_id:_lectureId
	},callback)
}


exports.offLecture=function(_lectureId,callback){
	db.Lecture.findOneAndUpdate({
		_id:_lectureId
	},{
		$set:{
			lStatus:0
		}
	},callback)
}

exports.onLecture=function(_lectureId,callback){
	db.Lecture.findOneAndUpdate({
		_id:_lectureId
	},{
		$set:{
			lStatus:1
		}
	},callback)
}

exports.changeLecture = function(_lectureId, content, callback){
	db.Lecture.findOneAndUpdate({
		_id:_lectureId
	},{
		$set:{
			name:name
			content:content
		}
	},callback)
}

exports.increaseVote= function(_lectureId,callback){
	db.Lecture.findOneAndUpdate({
		_id:_lectureId
	},{
		$set:{
			totalVote:+1
		}
	},callback)
}

exports.increaseSection= function(_lectureId,callback){
	db.Lecture.findOneAndUpdate({
		_id:_lectureId
	},{
		$set:{
			totalSection:+1
		}
	},callback)
}

exports.increaseQuestion= function(_lectureId,callback){
	db.Lecture.findOneAndUpdate({
		_id:_lectureId
	},{
		$set:{
			totalQuestion:+1
		}
	},callback)
}