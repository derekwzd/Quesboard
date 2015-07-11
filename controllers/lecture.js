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

exports.changeLecture = function(_lectureId, name, content, callback){
	db.Lecture.findOneAndUpdate({
		_id:_lectureId
	},{
		$set:{
			name:name,
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

//sort by totalvote
exports.getAllLectures=function(callback){
	db.Question.find({

	},null,{
		sort:{
			'totalVote':-1
		},
		limit:20
	},callback)
}

exports.getSectionById= function(_lectureId, callback){
	db.Lecture.findOne({
		_id:_lectureId
	},function(err,lecture){
		if(err){
			callback(err)
		}else{
			async.parallel([
				function(done){
					db.Section.find({
						_lectureId:_lectureId
					},null,{
						sort:{
							'time':-1
						},
						limit:20
					},function(err,lectures){
						done(err,lectures.reverse())
					})
				}
				],
				function(err,results){
					if(err){
						callback(err)
					}else{
						lecture=lecture.toObject()
						lecture.sections=results[1]
						callback(null,lecture)
					}
				});
			}
	})
}