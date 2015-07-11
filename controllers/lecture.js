var db = require('../models')
var async = require('async')

exports.createNewLecture = function(lecture, callback) {
    var newlecture = new db.Lecture()
    // console.log('test!!')
    newlecture.boardID = lecture.boardID
    newlecture.name = lecture.name
    newlecture.content = lecture.content
    newlecture.creator = lecture.creator
    newlecture.qrUrl = lecture.qrUrl
    newlecture.totalVote = 0
    newlecture.totalQuestion = 0
    newlecture.totalSection = 0
    newlecture.lStatus = 1
    newlecture.save(callback)
}

exports.deleteLecture = function(_lectureId, callback) {
    db.Lecture.remove({
        _id: _lectureId
    }, callback)
}


exports.offLecture = function(_lectureId, callback) {
    db.Lecture.findOneAndUpdate({
        _id: _lectureId
    }, {
        $set: {
            lStatus: 0
        }
    }, callback)
}

exports.onLecture = function(_lectureId, callback) {
    db.Lecture.findOneAndUpdate({
        _id: _lectureId
    }, {
        $set: {
            lStatus: 1
        }
    }, callback)
}

exports.changeLecture = function(_lectureId, name, content, callback) {
    db.Lecture.findOneAndUpdate({
        _id: _lectureId
    }, {
        $set: {
            name: name,
            content: content
        }
    }, callback)
}

exports.increaseVote = function(_lectureId, callback) {
    db.Lecture.findOneAndUpdate({
        _id: _lectureId
    }, {
        $set: {
            totalVote: +1
        }
    }, callback)
}

exports.increaseSection = function(_lectureId, callback) {
    db.Lecture.findOneAndUpdate({
        _id: _lectureId
    }, {
        $set: {
            totalSection: +1
        }
    }, callback)
}

exports.increaseQuestion = function(_lectureId, callback) {
    db.Lecture.findOneAndUpdate({
        _id: _lectureId
    }, {
        $set: {
            totalQuestion: +1
        }
    }, callback)
}

// sort by totalvote
exports.getAllLectures = function(_userId, callback) {
        db.Lecture.find({
            "$or":[
            {lStatus:1},
            {creator:{
                _id:_userId
            }}
            ]
        }, null, {
            sort: {
                'time': -1
            },
            limit: 20
        }, callback)
}

//need to be tested
exports.getSectionById = function(_lectureId, callback) {
    db.Lecture.findOne({
        _id: _lectureId
    }, function(err, lecture) {
        if (err) {
            callback(err)
        } else {
            async.parallel([
                    function(done) {
                        db.Section.find({
                            _lectureId: _lectureId
                        }, null, {
                            sort: {
                                'time': -1
                            },
                            limit: 20
                        }, function(err, lectures) {
                            done(err, lectures.reverse())
                        })
                    }
                ],
                function(err, results) {
                    if (err) {
                        callback(err)
                    } else {
                        lecture = lecture.toObject()
                        lecture.sections = results[1]
                        callback(null, lecture)
                    }
                });
        }
    })
}

exports.findCreatorById = function(_lectureId, callback){
    db.Lecture.findOne({
        _id:_lectureId
    },{creator:1},function(err, lecture){
        if (err) {
            callback(err)
            // console.log(err)
        }else{
            // console.log('htet'+lecture)
            callback(null, lecture)
        }
    })
}

