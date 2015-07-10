var db=require('../models')
var async = require('async')

exports.createNewSection = function(section, callback){
	var section=new db.Section()
	section.content=section.content
	section.lectureId=section.lectureId
	section.sStatus=1
	section.save(callback)
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
	db.Section.find({
		lectureId:_letureId
	},null,{
		sort:{
			'creatAt':-1
		},
		limit:20
	},callback)
}