var mongoose=require("mongoose");
var SpotSchema=require('../schemas/spot');

var Spot=mongoose.model('spots',SpotSchema); //数据库的表单名要为复数
module.exports=Spot;