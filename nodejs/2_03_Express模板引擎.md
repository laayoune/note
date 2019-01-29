需要在应用中进行如下设置才能让express渲染模板文件:
* views,放模板文件的目录 app.set('views','./views')
* view engine,模板引擎 app.set('view engine','jade')

jade是默认模板引擎,但是不推荐使用

建议使用swig模板引擎,它有如下特点:
* 根据路径渲染页面
* 面向对象的模板继承,页面复用
* 动态页面
* 快速上手
* 功能强大

# swig使用

安装
```
npm install swig --save
```

参考文档:
[https://blog.csdn.net/dszgf5717/article/details/50697686](https://blog.csdn.net/dszgf5717/article/details/50697686)

app.js
```JavaScript
var swig = require('swig');
app.set('view engine', 'html');

app.engine('html', swig.renderFile);

app.get('/',function(req, res, next) {
  res.render('index',{
    title: '测试首页',
    data: 'Hello Express'
  });
});
```
然后在页面引入使用的模板
```
{% extends 'layout.html' %}
```
设置模板

详细查看 [expresstest实例](https://github.com/laayoune/note/tree/master/nodejs/expresstest)