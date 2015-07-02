var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
exports.User = mongoose.model('User', require('./user'))