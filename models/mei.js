var mongoose=require("mongoose");
var MeiSchema=require('../schemas/mei');

var Mei=mongoose.model('beauties',MeiSchema); //数据库的表单名要为复数
module.exports=Mei;
