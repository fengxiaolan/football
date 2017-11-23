var express=require("express");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/football",{useMongoClient:true}).then(function(db){
	console.log("数据库连接成功");
})

var app=express(); //创建实例

//中间件使用
//导入model
var User=require('./models/user');
var Life=require('./models/life');
var Mei=require('./models/mei');
var Spot=require('./models/spot');

//请求assets里面的
//http://127.0.0.1:6060/html/login.html
app.use(express.static('assets'));//指定请求静态资源
app.use(express.static('uploadcache')) ;//图片路径
var upload=require('./util/upload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));


//页面输出
//http://127.0.0.1:6060/login
app.get('/login',function(req,res){
   console.log(req.url);
   res.set('content-Type','text/html');
   res.send("<p>社会哥</p>");
})

//处理post请求
app.post('/login',function(req,res){
    //console.log(req.body); 
    //对象的解构
    var {tel,pwd}=req.body;
    User.find({tel,pwd},function(err,doc){
    	//console.log(doc);//用户信息
    	if(doc.length){
    		res.json({
    			code:0,
                msg:"成功登录"
    		})
    	}else{
    		res.json({
    		code:0,
            msg:"账户或密码不匹配"
            });
    	}
    	
    });
})

//注册处理

 app.post('/register',function(req,res){
 	var {tel,pwd,name}=req.body;
    User.find({tel},function(err,doc){

           for(var i=0;i<doc.length;i++){
            if(doc[i].tel==tel){
              res.json({
                 code:2,
                 msg:"用户名已经存在"
              })
              return;
            }
        } 
       
        
    })
 	//model的存储方法
 	var user=new User({
 		tel,
 		pwd,
 		name
 	});  
               
     	user.save(function(err,doc){
     		if(err){
     			console.error("保存失败");
     			res.json({
     				code:1,
     				msg:"保存失败"
     			})
     			return;
     		}else{
               
                    res.json({
                        code:0,
                        msg:"保存成功",
                        doc
                  })
            }
     	})

 })



//处理图片上传
app.post('/upload',function(req,res){
    upload.upload(req,res);
})


//处理足球现场(拉数据)
app.get('/index1/showlist',function(req,res){
  //var page=
   Spot.find(function(err,doc){
      //console.log(doc);
       if(err){
            return ;
        }
        res.json({   
            doc:doc
        })
   });
  // .skip(page*6).limit(6);
});

//处理足球生活加载更多(拉数据)
app.get('/index2/addMore',function(req,res){
   Life.find(function(err,doc){
      //console.log(doc);
       if(err){
            return ;
        }
        res.json({   
            doc:doc
        })
   });
});


//处理足球美女加载更多(拉数据)
app.get('/index3/addMore',function(req,res){
   Mei.find(function(err,doc){
      //console.log(doc);
       if(err){
            return ;
        }
        res.json({   
            doc:doc
        })
   }) 
});






app.listen(6060,function(){
	console.log("启动成功！");
});