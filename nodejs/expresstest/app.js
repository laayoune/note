var express = require("express"); //引入express
var app = express(); //创建实例
var router = express.Router(); //路由中间件

var swig = require('swig');
app.set('view engine', 'html');

app.engine('html', swig.renderFile);
/* app.use(function(req, res, next) { //应用级中间件
  console.log("必经路由");
  next();
}); */
//加载静态资源
app.use(express.static('public'));

app.get('/',function(req, res, next) {
  res.render('index',{
    title: '测试首页',
    data: 'Hello Express'
  });
});
/* app.get(
  '/index',
  function(req, res, next) {
    req.data = 123;
    next();
  },
  function(req, res, next) {
    console.log("通过中间件取到的值", req.data);
    res.send("end");
  }
); */
//监听8081端口
var server = app.listen(8081, function() {
  console.log("接口已启动");
});
