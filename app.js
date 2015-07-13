var express = require('express');
var flash = require('connect-flash');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 80;
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var Controllers_lecture = require('./controllers/lecture.js')
var Controllers_question = require('./controllers/question.js')



app.use(bodyParser())
app.use(flash())
app.use(session({
    //secret:settings.cookieSecret,
    secret: 'technnode',
    //key:settings.db,
    cookie: {
        //1days TTL
        maxAge: 60 * 1000 * 60 * 24
    }
}))



app.use(express.static(__dirname + '/static'));
var api = require('./routes/api.js')
app.use('/api', api)

app.use('/', function(req, res) {
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
    socket.on('joinRoom', function(join) {
        socket.join(join.section_Id)
        socket.emit('joinRoom', "you are in: "+join.section_Id)
    })

    socket.on('getAllMessages', function(data) {

        // socket.join(data.section_Id)

        var user_Id = data.user_Id;
        var section_Id = data.section_Id;
        var lecture_Id = data.lecture_Id;
        Controllers_lecture.findCreatorById(lecture_Id, function(err, lec) {
            if (lec.creator._id && lec && user_Id === lec.creator._id.toString()) {
                Controllers_question.getAllQuestions(section_Id, function(err, msg) {
                    if (err) {
                        console.log('getAllQuestions failed')
                    } else {
                        // res.send(msg)
                        socket.emit('allMessages', msg)
                    }
                })
            } else {
                Controllers_question.getActiveQuestions(section_Id, function(err, msg) {
                    if (err) {
                        console.log('getActiveQuestions failed')
                    } else {
                        socket.emit('allMessages', msg)
                    }
                })
            }
        })
    })




    socket.on('createMessage', function(message) {
        var newquestion = {
            content: message.content,
            sectionId: message.section_Id,
            creator: {
                _id: message.user_Id,
                name: message.name,
                avatarUrl: message.avatarUrl
            }
        }
        Controllers_question.createNewQuestion(newquestion, function(err, msg) {
            if (err) {
                res.send(err)
            } else {
                msg.quesid = messages.length + 1;
                messages.push(msg);
                socket.in(message.section_Id).broadcast.emit('messageAdded', msg)
                socket.emit('messageAdded', msg)
            }
        })
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
