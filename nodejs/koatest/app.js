const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    // ctx.throw(404,'name required')
    ctx.body = 'Hello World';
    console.log(ctx.query.name); //http://localhost:3000/?name=aa  ,输出aa
    /* ctx.body = {
        name: 'aaa'
    } */
    //res头会随着返回值类型的不同而不同
    //Content-Type: application/json; charset=utf-8
});

app.listen(3000);