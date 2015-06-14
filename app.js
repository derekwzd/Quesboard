var express = require('express');
var app = express();
var port = process.env.PORT || 80;

app.use(express.static(__dirname+'/static'));

app.use(function (req, res){
	res.sendfile('./static/index.html');
});

var io = require('socket.io').listen(app.listen(port));

console.log('quesboard is on port '+port+'!');

//Message Send
var messages = ["fdsafdsa"];

io.sockets.on('connection', function(socket){
	socket.emit('connected');
	socket.on('getAllMessages', function(){
		socket.emit('allMessages', messages)
	})
	socket.on('createMessage', function(message){
		messages.push(message);
		io.sockets.emit('messageAdded', message)
	})
});
//End of Message Send



// //Modify
// var Controllers = require('./controllers');
// // app.use(express.bodyParser())
// var bodyParser = require('body-parser')
// app.use(bodyParser)

// // app.use(express.cookieParser())
// var cookieParser = require('cookie-parser')
// app.use(cookieParser)

// var session = require('express-session')
// app.use(session({
// 	secret:'technode',
// 	cookie:{
// 		maxAge:60*1000
// 	},
// 	resave:true,
// 	saveUninitialized:true
// }))

// app.get('/api/validate', function(req, res){
// 	_userId = req.session._userId;
// 	if(_userId){
// 		Controllers.User.findUserById(_userId, function(err, user){
// 			if(err){
// 				res.json(401, {msg:err})
// 			}else{
// 				res.json(user)
// 			}
// 		})
// 	}else{
// 		res.json(401, null)
// 	}
// })


// app.post('/api/login', function(req, res){
// 	email = req.body.email
// 	if(email){
// 		Controllers.User.findByEmailOrCreate(email, function(err, user){
// 			if(err){
// 				res.json(500, {msg:err})
// 			}else{
// 				req.session._userId = user._id
// 				res.json(user)
// 			}
// 		})
// 	}else{
// 		res.json(403)
// 	}
// })


// app.get('/api/logout', function(req, res){
// 	req.session._userId = null
// 	req.json(401)
// })


























