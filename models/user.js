var mongoose=require("mongoose");
var UserSchema=require('../schemas/user');

var User=mongoose.model('users',UserSchema); //数据库的表单名要为复数
module.exports=User;