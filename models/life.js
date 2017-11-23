var mongoose=require("mongoose");
var LifeSchema=require('../schemas/life');

var Life=mongoose.model('lifes',LifeSchema); //数据库的表单名要为复数
module.exports=Life;