var express = require('express');
var app = express();
var port = process.env.PORT || 80;


app.use(express.static(__dirname + '/static'));
app.use(function(req, res) {
    res.sendfile('./static/index.html');
});
// //Modify
// var Controllers = require('./controllers');
// var bodyParser = require('body-parser')
// app.use(bodyParser)

// app.use(express.cookieParser())
// var cookieParser = require('cookie-parser')
// app.use(cookieParser)
// var session = require('express-session')
// app.use(session({
//  secret:'technode',
//  cookie:{
//      maxAge:60*1000
//  },
//  resave:true,
//  saveUninitialized:true
// }))


app.get('/api/validate', function(req, res){
})


app.post('/api/login', function(req, res){
    username = req.body.username;
    res.json(username)
    console.log('test here');
})



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




// app.get('/api/validate', function(req, res){
//  _userId = req.session._userId;
//  if(_userId){
//      Controllers.User.findUserById(_userId, function(err, user){
//          if(err){
//              res.json(401, {msg:err})
//          }else{
//              res.json(user)
//          }
//      })
//  }else{
//      res.json(401, null)
//  }
// })


// app.post('/api/login', function(req, res){
//  email = req.body.email
//  if(email){
//      Controllers.User.findByEmailOrCreate(email, function(err, user){
//          if(err){
//              res.json(500, {msg:err})
//          }else{
//              req.session._userId = user._id
//              res.json(user)
//          }
//      })
//  }else{
//      res.json(403)
//  }
// })


// app.get('/api/logout', function(req, res){
//  req.session._userId = null
//  req.json(401)
// })
