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
