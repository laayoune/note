# 什么是中间件
中间件是一个函数,它可以访问请求对象(req)、响应对象(res)和web应用中处于请求-》响应循环流程中的中间件，一般被命名为next的变量

中间件有如下几种:
* 应用级中间件
> 挂载在了app对象上,如app.use()
* 路由级中间件
```JavaScript
var router = express.Router();
router.use()
//router中间件没有特别复杂的app例api router->只有路由相关的api mini - app
```
* 错误处理中间件
和其他中间件类似,只是要使用4个参数(err,req,res,next)
```JavaScript
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send("出错了");
});
```
* 内置中间件
> 4.x开始,express.static是express唯一内置的中间件,负责提静态资源
```JavaScript
app.use(express.static('public'));
```
* 第三方中间件
```JavaScript
先npm安装第三方中间件
var aa = require('第三方中间件'); //引入
app.use(aa());  //使用
```

中间件的功能:
* 执行任何代码,执行后通过next()进入下一个中间件,否则请求被挂起
* 修改请求和响应对象
* 终结请求->响应循环
* 调用堆栈中的下一个中间件

# 错误处理
使用错误处理中间件

log4j错误日志中间件
也可以express-log

