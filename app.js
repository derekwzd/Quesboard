var express = require('express');
var flash = require('connect-flash');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 80;
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

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
