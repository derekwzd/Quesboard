var express = require('express');
var Controllers_user = require('../controllers/user.js')
var Controllers_audituser = require('../controllers/audituser.js')
var Controllers_section = require('../controllers/section.js')
var Controllers_lecture = require('../controllers/lecture.js')
var Controllers_question = require('../controllers/question.js')
var router = express.Router();

router.post('/getAllLectures', function(req, res) {
    var data = req.body;
    if (data && data.lecture_Id) {
        Controllers_lecture.getSectionById(data.lecture_Id, function(err, lecture) {
            if (err) {
                res.send(err.message);
            } else {
                res.send(lecture)
            }
        })
    } else {
        Controllers_lecture.getAllLectures(data.user_Id, function(err, lectures) {
            if (err) {
                res.send(err);
            } else {
                res.send(lectures);
            }
        })
    }
})

router.get('/api/validate', function(req, res) {
    _userId = req.session._userId
    if (_userId) {
        Controllers_user.findUserById(_userId, function(err, user) {
            if (err) {
                console.log('error')
                res.json(401, {
                    msg: err
                })
            } else {
                res.json(user)
            }
        })
    } else {
        console.log('not');
        res.json(401, null)
    }
})

router.post('/api/login', function(req, res) {
    email = req.body.email
    password = req.body.password
    if (email && password) {
        Controllers_user.findByEmail(email, function(err, user) {
            if (err) {
                req.flash('error', 'the email have not registrated');
                res.json(500, {
                    msg: err
                })
            } else {
                if (password === user.password) {
                    // req.session._userId = user._id
                    res.json(user)
                } else {
                    req.flash('error', 'password incorrect')
                    res.json(404, {
                        msg: err
                    })
                }
            }
        })
    } else {
        console.log('response 403')
        res.json(403)
    }
})



router.post('/api/reg', function(req, res) {
    var email = req.body.email,
        password = req.body.password
        // password_re=req.body['password_repeat'];
        // if(password_re !=password){
        //     req.flash('error','The two password you inputed is not same!');
        //     return res.redirect('/reg');
        // }
        //var md5=crypto.createHash('md5'),
        //password=md5.update(req.body.password).digest('hex');
    // console.log('the regemail is:' + email)
    // console.log('the regpassword is:' + password)
    if (email && password) {
        // Controllers.User.findByEmailOrCreate(email, function(err, user) {
        Controllers_user.createNewUser(email, password, function(err, user) {
            if (err) {
                // console.log('the email have registrated please login');
                req.flash('error', 'the email have registrated please login');
                res.json(500, {
                    msg: err
                })
            } else {
                // console.log('signup success');
                res.json(user)
            }
        })
    } else {
        // console.log('lack email or password')
        res.json(403)
    }
})

router.post('/api/getAllLectures', function(req, res) {
    var data = req.body;
    if (data && data.lecture_Id) {
        Controllers_lecture.getSectionById(data.lecture_Id, function(err, lecture) {
            if (err) {
                res.send(err.message);
            } else {
                res.send(lecture)
            }
        })
    } else {
        Controllers_lecture.getAllLectures(data.user_Id, function(err, lectures) {
            if (err) {
                res.send(err);
            } else {
                res.send(lectures);
            }
        })
    }
})

router.post('/api/getAllSectionsByID', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    // console.log("haha" + lecture_Id)
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
            var _id = lec.creator._id.toString()
            if (user_Id === _id) {
                Controllers_section.getAllSections(lecture_Id, function(err, msg) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send(msg)
                    }
                })
            } else {
                Controllers_section.getActiveSections(lecture_Id, function(err, msg) {
                    if (err) {
                        console.log('getActiveSections failed')
                        res.send(err)
                    } else {
                        res.send(msg)
                    }
                })
            }
        })
        // if(Controllers_lecture.validSeeLectureContent(user_Id, lecture_Id)==='yes')   
})

router.post('/api/getAllQuestionsByID', function(req, res) {
    var user_Id = req.body.user_Id;
    var section_Id = req.body.section_Id;
    var lecture_Id = req.body.lecture_Id;
    // console.log("section" + section_Id)
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id.toString()
        if (user_Id === _id) {
            Controllers_question.getAllQuestions(section_Id, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(msg)
                }
            })
        } else {
            Controllers_question.getActiveQuestions(section_Id, function(err, msg) {
                if (err) {
                    console.log('getActiveQuestions failed')
                    res.send(err)
                } else {
                    res.send(msg)
                }
            })
        }
    })
})

router.post('/api/creatlecture', function(req, res) {
    creator = req.body.creator;
    name = req.body.name
    content = req.body.content
    if (name && content) {
        var newLecture = {
            boardID: "",
            name: name,
            content: content,
            qrUrl: "999",
            creator: {
                _id: creator
            }
        }
        Controllers_lecture.createNewLecture(newLecture, function(err, msg) {
            if (err) {
                res.json(err)
            } else {
                res.json(msg)
            }
        })
    } else {
        console.log('response 403')
        res.json(403, null)
    }
})


router.post('/api/createSection', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var content = req.body.content;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id;
        if (user_Id === _id.toString()) {
            console.log('You are the creator,access')
            if (lecture_Id) {
                var newsection = {
                    content: content,
                    lectureId: lecture_Id,
                }
                Controllers_section.createNewSection(newsection, function(err, section) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("create Success")
                    }
                })
            }
        } else {
            res.json(403, null)
        }
    })
})


router.post('/api/createQuestion', function(req, res) {
    var name = req.body.name;
    var avatarUrl = req.body.avatarUrl;
    var user_Id = req.body.user_Id;
    var section_Id = req.body.section_Id;
    var lecture_Id = req.body.lecture_Id;
    var content = req.body.content;
    if (section_Id) {
        var newquestion = {
            content: content,
            sectionId: section_Id,
            creator: {
                _id: user_Id,
                name: name
            }
        }
        Controllers_question.createNewQuestion(newquestion, function(err, msg) {
            if (err) {
                res.send(err)
            } else {
                // console.log(msg)
                res.send("create")
            }
        })
    }
})

router.post('/api/deleteLecture', function(req, res) {
    var lecture_Id = req.body.lecture_Id;
    var user_Id = req.body.user_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id;
        if (user_Id === _id.toString()) {
            console.log('You are the creator,valid to delete')
            Controllers_lecture.deleteLecture(_lectureId, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("delete")
                }
            })
        }
    })
})


router.post('/api/openLecture', function(req, res) {
    var lecture_Id = req.body.lecture_Id;
    var user_Id = req.body.user_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id;
        if (user_Id === _id.toString()) {
            console.log('You are the creator,valid to open')
            Controllers_lecture.onLecture(_lectureId, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("open")
                }
            })
        }
    })
})

router.post('/api/closeLecture', function(req, res) {
    var lecture_Id = req.body.lecture_Id;
    var user_Id = req.body.user_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id;
        if (user_Id === _id.toString()) {
            console.log('You are the creator,valid to close')
            Controllers_lecture.offLecture(_lectureId, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("close")
                }
            })
        }
    })
})

router.post('/api/deleteSection', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var section_Id = req.body.section_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id;
        if (user_Id === _id.toString()) {
            console.log('You can delete')
            Controllers_section.deleteSection(_sectionId, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("delete")
                }
            })
        }
    })
})

router.post('/api/openSection', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var section_Id = req.body.section_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id;
        if (user_Id === _id.toString()) {
            console.log('You can open')
            Controllers_section.onSection(_sectionId, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("open")
                }
            })
        }
    })
})

router.post('/api/closeSection', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var section_Id = req.body.section_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id;
        if (user_Id === _id.toString()) {
            console.log('You can close')
            Controllers_section.offSection(_sectionId, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("close")
                }
            })
        }
    })
})

router.post('/api/deleteQuestion', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var question_Id = req.body.question_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id;
        if (user_Id === _id.toString()) {
            console.log('You can delete')
            Controllers_question.deleteQuestion(_questionId, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("delete")
                }
            })
        }
    })
})

router.post('/api/openQuestion', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var question_Id = req.body.question_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id;
        if (user_Id === _id.toString()) {
            console.log('You can open')
            Controllers_question.onQuestion(_questionId, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("open")
                }
            })
        }
    })
})

router.post('/api/closeQuestion', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var question_Id = req.body.question_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        var _id = lec.creator._id;
        if (user_Id === _id.toString()) {
            console.log('You can close')
            Controllers_question.offQuestion(_questionId, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("close")
                }
            })
        }
    })
})


router.post('/api/auditlogin', function(req, res) {
    name = req.body.auditname
    console.log(req.body)
    console.log('the auditname is:' + name)
    console.log(Controllers_audituser)
    if (name) {
        Controllers_audituser.createNewAudit(name, function(err, user) {
            if (err) {
                res.json(401, {
                    msg: err
                })
            } else {
                res.json(user)
            }
        })
    } else {
        console.log('response 403')
        res.json(403, null)
    }
})


router.get('/api/logout', function(req, res) {
    req.session._userId = null
    req.json(401)
})



module.exports = router;