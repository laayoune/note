# 什么是回调
* 函数调用的方式分为三种:同步调用、回调和异步调用
* 回调是一种双向调用模式
* 可以通过回调函数来实现回调

# 阻塞和非阻塞
阻塞和非阻塞关注的是程序在等待调用结果(消息,返回值)时的状态
* 阻塞就是做不完不准回来
* 非阻塞就是你先做,我先看看有其他事没有,完了告诉我一声

# node.js的回调函数
```JavaScript
//阻塞代码，必须读取文件成功后才能打印
var fs = require('fs');
var data = fs.readFileSync('data.txt'); //使用同步阻塞式读取文件
console.log(data.toString());
```

```JavaScript
//非阻塞代码
var fs = require('fs');
var data = fs.readFile('data.txt', function(err, data){ //回调函数
    if(err){
        return console.error(err);
    }
    console.log(data.toString());
});
console.log('程序执行完毕'); //先输出,再输出文件内容,不会等待
```
