var express = require('express');
// var MongoStore =require('connect-mongo')(express);
//var settings =require('./settings');
var flash = require('connect-flash');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose')
var Schema = mongoose.Schema
    //6.30 TODO:modify
    // login authentication interface
var Controllers_user = require('./controllers/user.js')
var Controllers_audituser = require('./controllers/audituser.js')
var Controllers_section = require('./controllers/section.js')
var Controllers_lecture = require('./controllers/lecture.js')
var Controllers_question = require('./controllers/question.js')
var bodyParser = require('body-parser')
app.use(bodyParser())
app.use(flash())
var cookieParser = require('cookie-parser')

app.use(session({
    //secret:settings.cookieSecret,
    secret: 'technnode',
    //key:settings.db,
    cookie: {
        //1days TTL
        maxAge: 60 * 1000 * 60 * 24
    }
}))

app.get('/api/validate', function(req, res) {
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

app.post('/api/login', function(req, res) {
    email = req.body.email
    password = req.body.password
        // console.log(Controllers.User)
    if (email && password) {
        // Controllers.User.findByEmailOrCreate(email, function(err, user) {
        Controllers_user.findByEmail(email, function(err, user) {
            if (err) {
                // console.log('the email have not registrated');
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
                    console.log('password incorrect');
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



app.post('/api/reg', function(req, res) {
    var email = req.body.email,
        password = req.body.password
        // password_re=req.body['password_repeat'];
        // if(password_re !=password){
        //     req.flash('error','The two password you inputed is not same!');
        //     return res.redirect('/reg');
        // }
        //var md5=crypto.createHash('md5'),
        //password=md5.update(req.body.password).digest('hex');
    console.log('the regemail is:' + email)
    console.log('the regpassword is:' + password)
    if (email && password) {
        // Controllers.User.findByEmailOrCreate(email, function(err, user) {
        Controllers_user.createNewUser(email, password, function(err, user) {
            if (err) {
                console.log('the email have registrated please login');
                req.flash('error', 'the email have registrated please login');
                res.json(500, {
                    msg: err
                })
            } else {
                console.log('signup success');
                res.json(user)
            }
        })
    } else {
        console.log('lack email or password')
        res.json(403)
    }
})

app.post('/api/getAllLectures', function(req, res) {
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

app.post('/api/getAllSectionsByID', function(req, res) {
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

app.post('/api/getAllQuestionsByID', function(req, res) {
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

app.post('/api/creatlecture', function(req, res) {
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


app.post('/api/createSection', function(req, res) {
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


app.post('/api/createQuestion', function(req, res) {
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

app.post('/api/auditlogin', function(req, res) {
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


app.get('/api/logout', function(req, res) {
    req.session._userId = null
    req.json(401)
        //  req.session.user=null;
        //  req.flash('success','logout succeed');
        //  res.redirect('/');
})







app.use(express.static(__dirname + '/static'));
app.use(function(req, res) {
    res.sendfile('./static/index.html');
});


var io = require('socket.io').listen(app.listen(port));

console.log('quesboard is on port ' + port + '!');

//Message Send
var orign_messages = [{
    quesid: 1,
    content: "Mr. Gates, I wonder why do you choose to hold this lecture in the University of Hong Kong, rather than Hong kong university of science and Technology? Is there any reason behind this? Is it because of HKU's commercial enviornment or is there any other reasons?",
    img: "img/profile100px/profile8.png",
    name: "Derek",
    votenum: 192
}, {
    quesid: 2,
    content: "Mr. Gates, I wonder why do you choose to hold this lecture in the University of Hong Kong, rather than Hong kong university of science and Technology? Is there any reason behind this? Is it because of HKU's commercial enviornment or is there any other reasons? blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
    img: "img/profile100px/profile1.png",
    name: "007",
    votenum: 16
}, {
    quesid: 3,
    content: "Mr. Gates, will You Sponser any Hong Kong Students to start a new IT company? Why?",
    img: "img/profile100px/profile24.png",
    name: "Popfido",
    votenum: 8
}];

var messages = orign_messages.concat()

io.sockets.on('connection', function(socket) {
    socket.emit('connected');
    socket.on('getAllMessages', function() {
        socket.emit('allMessages', messages)
    })
    socket.on('createMessage', function(message) {
        message.quesid = messages.length + 1;
        messages.push(message);
        io.sockets.emit('messageAdded', message)
    })
    socket.on('resetMessages', function() {
        messages = orign_messages.concat()
        socket.emit('orignMessages', messages)
    })
    socket.on('vote', function(quesid) {
        messages[quesid - 1]["votenum"] += 1;
        io.sockets.emit('triggervote', messages)
    })
    socket.on('unvote', function(quesid) {
        messages[quesid - 1]["votenum"] -= 1;
        io.sockets.emit('triggervote', messages)
    })
});
//End of Message Send
