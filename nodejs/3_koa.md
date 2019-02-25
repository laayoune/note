# 什么是koa
[https://koa.bootcss.com/](https://koa.bootcss.com/)

基于node.js平台的下一代web开发框架,由 Express 幕后的原班人马打造
>通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 >
>Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

# koa的应用
### 安装
> Koa 依赖 node v7.6.0 或 ES2015及更高版本和 async 方法支持.
```
$ nvm install 7
$ npm i koa
$ node my-koa-app.js
```
### 应用
```JavaScript
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```
node启动服务,浏览器查看输出Hello World

#### 级联
Koa 中间件以更传统的方式级联，您可能习惯使用类似的工具 - 之前难以让用户友好地使用 node 的回调。然而，使用 async 功能，我们可以实现 “真实” 的中间件。对比 Connect 的实现，通过一系列功能直接传递控制，直到一个返回，Koa 调用“下游”，然后控制流回“上游”。

以 “Hello World” 的响应作为示例，当请求开始时首先请求流通过 x-response-time 和 logging 中间件，然后继续移交控制给 response 中间件。当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。
```JavaScript
const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  //next前没有,传递到x-response-time执行next前的代码,然后按照1->2->3->4的顺序执行
  await next();
  const rt = ctx.response.get('X-Response-Time');   //4
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);  //4
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();  // 1
  await next();
  const ms = Date.now() - start;   //3
  ctx.set('X-Response-Time', `${ms}ms`); //3
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World'; //2
});

app.listen(3000);
```

#### 设置
应用程序设置是 app 实例上的属性，目前支持如下：
* app.env 默认是 NODE_ENV 或 "development"   **需要注意**
* app.proxy 当真正的代理头字段将被信任时
* app.subdomainOffset 对于要忽略的 .subdomains 偏移[2]

# 上下文(Context)
Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。
```JavaScript
app.use(async ctx => {
  ctx; // 这是 Context
  ctx.request; // 这是 koa Request
  ctx.response; // 这是 koa Response
});
```

# 请求(Request)
Koa Request 对象是在 node 的 vanilla 请求对象之上的抽象
* request.header 请求标头对象
* request.method 请求方法
* request.url 获取请求 URL.
* request.href 获取完整的请求URL，包括 protocol，host 和 url。
* request.type 获取请求 Content-Type
* request.query 获取解析的查询字符串, 当没有查询字符串时，返回一个空对象

# 响应(Response)
* response.header
* response.status  获取响应状态,默认404
* response.body 响应主体 (string\Buffer\Stream\Object || Array JSON\null )

官网实例:
[https://github.com/koajs/examples](https://github.com/koajs/examples)
把很多东西都一段段的写好了