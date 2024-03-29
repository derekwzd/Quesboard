var express = require('express');
var Controllers_user = require('../controllers/user.js')
var Controllers_audituser = require('../controllers/audituser.js')
var Controllers_section = require('../controllers/section.js')
var Controllers_lecture = require('../controllers/lecture.js')
var Controllers_question = require('../controllers/question.js')
var router = express.Router();
var qr = require('qr-image');



// router.post('/getAllVote', function(req, res){
//     var user_Id = req.body.user_Id;
//     if(user_Id){
//         Controllers_user.getAllVote(user_Id, function(err, votedarray){
//             if(err){
//                 res.send(400)
//             }else{
//                 res.send(votedarray)
//             }
//         })
//     }
// })

router.post('/showqr', function(req, res) {
    var url = req.body.lectureUrl
        console.log(url)
    var qrImg = qr.image(url, {
        type: 'svg'
    });
    res.type('svg');
    qrImg.pipe(res);
});


router.post('/getAllLectures', function(req, res) {
    var data = req.body;
    console.log(data)
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
                console.log(err);
                res.send(err);
            } else {
                //console.log(lectures);
                res.send(lectures);
            }
        })
    }
})

router.post('/getLecture', function(req, res) {
    var data = req.body
    console.log(data);
    Controllers_lecture.getLecture(data.lecture_Id, function(err, lecture) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(lecture)
            res.send(lecture);
        }
    })
})


router.post('/createQuestion', function(req, res) {
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

router.get('/validate', function(req, res) {
    _userId = req.session._userId
    if (_userId) {
        Controllers_user.findUserById(_userId, function(err, user) {
            if (err) {
                // console.log('error')
                res.json(401, {
                    msg: 'error'
                })
            } else {
                res.json(user)
            }
        })
    } else {
        // console.log('not');
        res.json(401, null)
    }
})

router.post('/login', function(req, res) {
    email = req.body.email
    password = req.body.password
    if (email && password) {
        Controllers_user.findByEmail(email, function(err, user) {
            if (err) {
                res.json(401, {
                    msg: ' The email have not registrated! '
                })
            } else {
                if (password === user.password) {
                    req.session._userId = user
                    res.json(user)
                } else {

                    res.json(400, {
                        msg: ' password incorrect! '
                    })
                }
            }
        })
    } else {
        // console.log('response 403')
        res.json(402, {
            msg: ' lack email or password! '
        })
    }
})



router.post('/reg', function(req, res) {
    var email = req.body.email
    var password = req.body.password
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
        //Controllers_user.createNewUser(email, password, function(err, user) {
        Controllers_user.findRegEmail(email, function(err, user) {
            if (err) {
                //console.log('the email have registrated please login');
                // req.flash('error', 'the email have registrated please login');
                res.json(500, {
                    msg: ' the email have registrated please login! '
                })
            } else {
                Controllers_user.createNewUser(email, password, function(err, user) {
                    if (err) {
                        res.json(500, {
                            msg: ' signup failed! '
                        })
                    } else {
                        console.log('signup success');
                        res.json(user)
                    }
                })
            }
        })
    } else {
        //console.log('lack email or password')
        res.json(403, {
            msg: ' lack email or password! '
        })
    }
})



router.post('/getAllSectionsByID', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    // console.log("haha" + lecture_Id)
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
            if (lec && user_Id === lec.creator._id.toString()) {
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

router.post('/getAllQuestionsByID', function(req, res) {
    var user_Id = req.body.user_Id;
    var section_Id = req.body.section_Id;
    var lecture_Id = req.body.lecture_Id;
    // console.log("section" + section_Id)
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
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

router.post('/creatLecture', function(req, res) {
    creator = req.body.creator;
    name = req.body.name
    content = req.body.content
    Controllers_user.findUserById(creator, function(err, user) {
        console.log(user);
        if (user.flag === 1) {
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
                res.json(403, "lack name or content! ")
            }
        } else {
            console.log('response 403')
            res.json(403, "Permission denied! ")
        }

    })

})

router.post('/editLecture', function(req, res) {
    var lecture_Id = req.body.lecture_Id;
    var user_Id = req.body.user_Id;
    var name = req.body.name;
    var content = req.body.content;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You are the creator,valid to edit')
            if (name || content) {
                Controllers_lecture.changeLecture(lecture_Id, name, content, function(err, msg) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("edit")
                    }
                })
            }
        } else {
            res.json(403, null)
        }
    })
})




router.post('/createSection', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var content = req.body.content;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
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
                        Controllers_lecture.increaseSection(lecture_Id, function(err, msg) {
                            if (err) {
                                res.send(err)
                            }
                        })
                        res.send(section)
                    }
                })
            }
        } else {
            res.json(403, null)
        }
    })
})

router.post('/editSection', function(req, res) {
    var lecture_Id = req.body.lecture_Id;
    var user_Id = req.body.user_Id;
    var _sectionId = req.body.section_Id;
    var content = req.body.content;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You are the creator,valid to edit')
            if (content) {
                Controllers_section.changeSection(_sectionId, content, function(err, msg) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("edit")
                    }
                })
            }
        } else {
            console.log('have no access')
            res.json(403, null)
        }
    })
})



router.post('/deleteLecture', function(req, res) {
    var lecture_Id = req.body.lecture_Id;
    var user_Id = req.body.user_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You are the creator,valid to delete')
            Controllers_lecture.deleteLecture(lecture_Id, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("delete")
                }
            })
        } else {
            res.json(403, null)
        }
    })
})


router.post('/openLecture', function(req, res) {
    var lecture_Id = req.body.lecture_Id;
    var user_Id = req.body.user_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You are the creator,valid to open')
            Controllers_lecture.onLecture(lecture_Id, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("open")
                }
            })
        } else {
            res.json(403, null)
        }
    })
})

router.post('/closeLecture', function(req, res) {
    var lecture_Id = req.body.lecture_Id;
    var user_Id = req.body.user_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You are the creator,valid to close')
            Controllers_lecture.offLecture(lecture_Id, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("close")
                }
            })
        } else {
            res.json(403, null)
        }
    })
})

router.post('/deleteSection', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var section_Id = req.body.section_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You can delete')
            Controllers_section.deleteSection(section_Id, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    Controllers_lecture.decreaseSection(lecture_Id, function(err, msg) {
                        if (err) {
                            res.send(err)
                        }
                    })
                    res.send("delete")
                }
            })
        } else {
            res.json(403, null)
        }
    })
})

router.post('/openSection', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var section_Id = req.body.section_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You can open')
            Controllers_section.onSection(section_Id, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("open")
                }
            })
        } else {
            res.json(403, null)
        }
    })
})

router.post('/closeSection', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var section_Id = req.body.section_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You can close')
            Controllers_section.offSection(section_Id, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("close")
                }
            })
        } else {
            res.json(403, null)
        }
    })
})

router.post('/deleteQuestion', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var question_Id = req.body.question_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You can delete')
            Controllers_question.deleteQuestion(question_Id, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("delete")
                }
            })
        } else {
            res.json(403, null)
        }
    })
})

router.post('/openQuestion', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var question_Id = req.body.question_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You can open')
            Controllers_question.onQuestion(question_Id, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("open")
                }
            })
        } else {
            res.json(403, null)
        }
    })
})

router.post('/closeQuestion', function(req, res) {
    var user_Id = req.body.user_Id;
    var lecture_Id = req.body.lecture_Id;
    var question_Id = req.body.question_Id;
    Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
        if (lec && user_Id === lec.creator._id.toString()) {
            console.log('You can close')
            Controllers_question.offQuestion(question_Id, function(err, msg) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("close")
                }
            })
        } else {
            res.json(403, null)
        }
    })
})

router.post('/auditlogin', function(req, res) {
    var name = req.body.auditname
    var img = req.body.auditimg
    if (req.session._userId) {
        res.json(req.session._userId)
    } else {
        if (name) {
            Controllers_audituser.createNewAudit(name, img, function(err, user) {
                if (err) {
                    res.json(401, {
                        msg: " createNewAudit error! "
                    })
                } else {
                    req.session._userId = user;
                    res.json(user)
                }
            })
        } else {
            console.log('response 403')
            res.json(403, {
                msg: "lack auditname! "
            })
        }
    }
})


router.get('/logout', function(req, res) {
    req.session._userId = null
    res.json('log out success')
        // console.log(req.session._userId)
})

module.exports = router;
