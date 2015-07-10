var db=require('../models')
var async = require('async')
var gravatar = require('gravatar')

exports.createNewAudit = function(auditname, callback){
			audituser =new db.Audituser
			audituser.auditname = auditname
			//TODO:avatarurl
			audituser.avatarUrl = gravatar.url(auditname)
			audituser.save()
			callback(null,audituser)	
}
