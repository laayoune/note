## 1. 数组

### 数组循环

ES5 中的循环

最早:
1. for
```JavaScript
for(let i=0;i<arr.length;i++)
```
2. while
```JavaScript
while (条件){
  //需要执行的代码
}

do{
  //需要执行的代码
}
while (条件);
```

后来:

3. arr.forEach() //代替普通的for
> forEach(回调函数,this指向这个参数可以不写指向Window)
>
> 回调函数有三个参数,分别是当前元素、当前元素索引、循环的数组对象
>
> 如果回调函数用的箭头函数,第二个this指向的参数设置无效,都是指向window

```JavaScript
var arr = ['a','b','c','d'];
arr.forEach(function(val, index, arr){
    console.log(val, index, arr);
    console.log(this); //abc
},'abc');
```

4. arr.map()
> 参数与forEach相同,区别map有返回值
>
> 需要配合return,返回一个新的数组
>
> 若是没有return,相当于forEach
```JavaScript
var arr = ['a','b','c','d'];
let arr1 = arr.map(function(val, index, arr){
    return val+1;
});
console.log(arr1); //["a1", "b1", "c1", "d1"]
```

5. arr.filter()
> 参数与forEach相同,有返回值,过滤一些不合格的元素
>
> 如果回调函数返回true,就留下来
```JavaScript
let arr = [
    {title:'aaaaa', hot:true},
    {title:'bbbb', hot:false},
    {title:'ccc', hot:false}
];
let newArr = arr.filter((val, index, arr)=>{
    return val.hot; //返回hot为true的项
});
console.log(newArr); //[{title:'aaaaa', hot:true}]
```

6. arr.some()
> 参数与forEach相同,有返回值
>
> 类似查找,  数组里面某一个元素符合条件，返回true
```JavaScript
var arr = ['a','b','c','d'];
let strture = arr.some((val, index, arr) =>{
    return val=='b';
});
console.log(strture); //true
```

6. arr.every()
> 参数与forEach相同,有返回值
> 
> 数组里面所有的元素都要符合条件，才返回true

---

7. arr.reduce()   //从左往右,如求数组的和、阶乘
> arr.reduce(回调函数)
>
> 回调函数有四个参数,分别是:初始值或上一个计算结束后的返回值、当前元素、索引、数组对象

```JavaScript
let arr = [1,2,3,4,5,6,7,8,9,10];
let res = arr.reduce((prev, cur, index, arr) =>{
    return prev+cur;
});
console.log(res); //55
```
8. arr.reduceRight() //从右往左

----
ES2017新增了一个运算符: 幂(**)
```JavaScript
Math.pow(2,3);  //2的3次方,返回8

2 ** 3; //8
```
-----

9. for...of...  

arr.keys()	数组下标

arr.entries()	数组某一项

```JavaScript
let arr = ['a','b','c','d'];

for(let val of arr){
    console.log(val); //a b c d
}
for(let index of arr.keys()){
    console.log(index); // 0 1 2 3
}
for(let item of arr.entries()){
    console.log(item); //[0, "a"] [1, "b"] [2, "c"] [3, "d"]
}
for(let [key, val] of arr.entries()){
    console.log(key,val); //0,a 1,b 2,c 3,d
}
```

----
### 数组的方法
1. Array.from(arr)
> 作用: 把类数组(获取一组元素、arguments...) 对象转成数组
```JavaScript
let arr =[1,2,3];
let arr2 = [...arr];
let arr2 = Array.from(arr);
```

2. Array.of()
> 把一组值，转成数组
```JavaScript
let arr = Array.of('a','b','c');
console.log(arr); //['a','b','c']
```

3. arr.find()
> 查找，找出第一个符合条件的数组成员，如果没有找到，返回undefined
>
> 如果找到了,返回第一个符合条件的元素
```JavaScript
let arr = [23,900,101,80,100];
let res = arr.find((val, index, arr) =>{
    return val>100;
});
console.log(res); //900
```

4. arr.findIndex()
> 找的是位置， 没找到返回-1

5. arr.fill(填充的东西, 开始位置, 结束位置)
```JavaScript
let arr = new Array(3);
arr.fill('默认值')
console.log(arr);//['默认值','默认值','默认值']
```

在ES2016里面新增:

6. arr.indexOf()
7. arr.includes() 
> 同str.includes()

---
---

## 2. object对象
语法简化了
```JavaScript
let a = 1;
let json ={
    a:a,
    showA:function(){
    }
}
//现在
let json ={
    a,
    showA(){
    }
}
new Vue({
    router,
    App,
    vuex
});
```
---
1. Object.is()
> 用来比较两个值是否相等
```JavaScript
Object.is(NaN, NaN); //true
Object.is(+0, -0); //false
```

2. Object.assign()
> 用来合并对象,如合并参数,复制一个对象
>
> let 新的对象 = Object.assign(目标对象, source1, srouce2....)
```JavaScript
function ajax(options){  //用户传
    let defaults={ //默认值
        type:'get',
        header:'',
        data:{}
    };
    let json = Object.assign({}, defaults, options); //用户有传参就用用户传参的,没有就用默认值,options有的会覆盖defaults
}
```

ES2017引入:

3. Object.keys() 键
4. Object.entries(); 键值
5. Object.values(); 值

---
---
## 3. Promise异步
作用:  解决异步回调问题

传统方式，大部分用回调函数，事件

```JavaScript
ajax(url,()=>{  //获取token
    ajax(url,()=>{  //获取用户信息
        ajax(url, ()=>{
            //获取用户相关新闻
        })
    })
})
```

现在

```JavaScript
let promise = new Promise(function(resolve, reject){
    //resolve,   成功调用
    //reject     失败调用
});
//promise.then(成功回调函数, 失败回调函数);
promise.then(res=>{}, err=>{});
promise.catch(err=>{});
```

本人用法:

```JavaScript
let a = 1;
new Promise((resolve,reject)=>{
    if(a==10){
        resolve('成功');
    }else{
        reject('失败');
    }
}).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
});
```

简写:

Promise.resolve('aaa');
等价于
```JavaScript
new Promise((resolve,reject)=>{
    resolve('aaa');
});
```

Promise.all([p1, p2, p3])
> 把promise打包，扔到一个数组里面，打包完还是一个promise对象
>
> 必须确保，所有的promise对象，都是resolve状态，都是成功状态

Promise.race([p1, p2, p3])
> 只要有一个成功，就返回

---
---

## 4. 模块化

js不支持模块化

    ruby可以require

    python可以import

在ES6之前，社区制定一套模块规范:

    Commonjs    主要服务端  nodeJs  require('http')

    AMD         requireJs, curlJs

    CMD         seaJs

ES6出来，同意服务端和客户端模块规范:

    import {xx} ddd

---

模块化：

    注意： 需要放到服务器环境

    a). 如何定义模块？
        export  东西

```JavaScript
    export const a =12;

    export{
        a as aaa,
        b as banana
    }
```

    b). 如何使用?
        import 东西

```JavaScript
    import './modules/1.js';

    import {a as a, banana, c} from './modules/2.js';
    import * as modTwo from './modules/2.js';

    //export default 12; default定义出来的
    import a from './modules/3.js'; //引入时不用加{},否则必须加
```

使用模块:

```JavaScript
    <script type="module"></script>
```

import:  特点

    a). import 可以是相对路径，也可以是绝对路径
    b). import模块只会导入一次，无论你引入多少次
    c). import './modules/1.js';  如果这么用，相当于引入文件
    d). 有提升效果，import会自动提升到顶部，首先执行
    e). 导出去模块内容，如果里面有定时器更改，外面也会改动，不想Common规范缓存

---

动态import():

> 类似node里面require，可以动态引入, 默认import语法不能写到if之类里面
>
> 返回值，是个promise对象

```JavaScript
import('./modules/1.js').then(res=>{
    console.log(res.a+res.b);
});
```

优点:
    1. 按需加载
    2. 可以写if中
    3. 路径也可以动态

Promise.all([])也可以

```JavaScript
Promise.all([
    import('1.js'),
    import('2.js')
]).then((mod1,mod2)=>{
    console.log(mod1);
    console.log(mod2);
})
```

ES2017加  async  await: 后面讲

---

ES6中模块化自动采用严格模式

'use strict'