 // var mongoose = require('mongoose')
 // console.log(4)
 // var Schema = mongoose.Schema
 // console.log(5)
 // var User = new Schema({
 //     email:String,
 //     name : String,
 //     avatarUrl: String
 // });

 // console.log(6)
 // module.exports = User;
 // console.log(7)

 //6.30
 var mongoose = require('mongoose')
 var Schema = mongoose.Schema
 var User = new Schema({
     email:String,
     avatarUrl: String,
     password:String,
     name : String
 });
 module.exports = User;

 //7.1Guo sign up respond
 //TODO Modify
 // var mongodb = require('./db');


 // function User(user) {
 //     this.email = user.email;
 //     this.name = user.name;
 //     this.password = user.password;
 //     //this.avatarUrl=user.avatarUrl;
 // };

 // module.exports = User;

 //TODO: can be moved to /controllers
 //save user info
 // User.prototype.save = function(callback) {
 //     //data to save in database
 //     var user = {
 //         name: this.name,
 //         password: this.password,
 //         email: this.email,
 //         //avatarUrl:this.avatarUrl
 //     };
 //     //open database
 //     mongodb.open(function(err, db) {
 //         if (err) {
 //             return callback(err);
 //         }
 //         //read user collection
 //         db.collection('user', function(err, collection) {
 //             if (err) {
 //                 mongodb.close();
 //                 return callback(err);
 //             }
 //             //insert user data to collection
 //             collection.insert(user, {
 //                 safe: true
 //             }, function(err, user) {
 //                 mongodb.close();
 //                 if (err) {
 //                     return callback(err);
 //                 }
 //                 callback(null, user[0]);
 //             });
 //         });
 //     });
 // };

 // //read user info
 // User.get = function(name, callback) {
 //     //open database
 //     mongodb.open(function(err, db) {
 //         if (err) {
 //             return callback(err);
 //         }
 //         //read user colletion
 //         db.colletion('users', function(err, colletion) {
 //             if (err) {
 //                 mongodb.close();
 //                 return callback(err);
 //             }
 //             //find target name
 //             colletion.findOne({
 //                 name: name
 //             }, function(err, user) {
 //                 mongodb.close();
 //                 if (err) {
 //                     return callback(err);
 //                 }
 //                 callback(null, user);
 //             });
 //         });
 //     });
 // };
 
