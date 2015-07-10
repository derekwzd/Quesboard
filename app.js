var express = require('express');
// var MongoStore =require('connect-mongo')(express);
//var settings =require('./settings');
var flash = require('connect-flash');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 80;
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
    // app.use(express.bodyParser())
    // app.use(express.cookieParser())
var cookieParser = require('cookie-parser')
    // app.use(cookieParser)

//var crypto=require('crypto'),
//User = require('./models/user.js');

//app.post('/api/login',checkNotLogin);
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
    console.log(req.body)
    password = req.body.password
    console.log('the loginemail is:' + email)
    console.log('the lohinpassword is:' + password)
        // console.log(Controllers.User)
    if (email && password) {
        // Controllers.User.findByEmailOrCreate(email, function(err, user) {
        Controllers_user.findByEmail(email, function(err, user) {
            if (err) {
                console.log('the email have not registrated');
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

// var md5 =crypto.createHash('md5'),
// password=md5.update(req.body.password).digest('hex');
// User.get(req.body.name,function(err,user){
//     if(!user){
//         req.flash('error','the user is nor existed');
//         return res.redirect('/');
//     }
//     if (user.password!=password) {
//         req.flash('error','password incorrect');
//         return res.redirect('/');
//     }
//     res.session.user=user;
//     req.flash('success','login succeed');
//     res.redirect('/section');
// });
// });
//7.1 registration 
// app.post('/reg',checkNotLogin);
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

app.post('/api/auditlogin', function(req, res) {
    auditname = req.body.auditname
    console.log(req.body)
    console.log('the auditname is:' + auditname)
    console.log(Controllers_audituser)
    if (auditname) {
        Controllers_audituser.createNewAudit(auditname, function(err, user){
            if (err) {
                res.json(401,{msg:err})
            }else{
                res.json(audituser)
            }
        })
    } 
    else {
        console.log('response 403')
        res.json(403,null)
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







//7.2 TODO:MODIFY
// function checkLogin(req,res,next){
//     if (!res.session.user){
//         req.flash('error','not login');
//         res.redirect('/');
//     }
//     next();
// }

// function checkNotLogin(req,res,next){
//     if(req.session.user){
//         req.flash('error','You have loged in');
//         res.redirect('back');
//     }
//     next();
// }






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
