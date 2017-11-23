var mongoose=require("mongoose");

var UserSchema=mongoose.Schema({
	name:String,
	tel:String,
	pwd:String
})
module.exports=UserSchema;
