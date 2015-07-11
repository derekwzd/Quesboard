var db=require('../models')
var async = require('async')

exports.createNewSection = function(section, callback){
	var newsection=new db.Section()
	console.log(section)
	newsection.content=section.content
	newsection.lectureId=section.lectureId
	newsection.sStatus=1
	newsection.save(callback)
}

exports.deleteSection=function(_sectionId,callback){
	db.Section.remove({
		_id:_sectionId
	},callback)
}


exports.offSection=function(_sectionId,callback){
	db.Section.findOneAndUpdate({
		_id:_sectionId
	},{
		$set:{
			sStatus:0
		}
	},callback)
}

exports.onSection=function(_sectionId,callback){
	db.Section.findOneAndUpdate({
		_id:_sectionId
	},{
		$set:{
			sStatus:1
		}
	},callback)
}

exports.changeSection = function(_sectionId, content, callback){
	db.Section.findOneAndUpdate({
		_id:_sectionId
	},{
		$set:{
			content:content
		}
	},callback)
}

exports.getAllSections=function(_lectureId,callback){
	console.log(_lectureId)
	db.Section.find({
		lectureId: _lectureId
	},null,{
		sort:{
			'time':-1
		},
		limit:20
	},callback)
}

exports.getActiveSections=function(_lectureId,callback){
	console.log(_lectureId)
	db.Section.find({
		lectureId: _lectureId,
		sStatus:1
	},null,{
		sort:{
			'time':-1
		},
		limit:20
	},callback)
}