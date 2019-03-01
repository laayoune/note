ES6 -> ECMA6 -> ES2015

js -> ECMA3.0 or ECMA5.2

-------
### 1. 关于定义（声明）变量

之前是  var
变量提升-》预解析

新增 let const，

和var的区别：
* 块级作用域。
* 没有预解析（变量提升），必须先定义后使用
* 保存this作用域（选项卡效果）
* 不能重复定义，重复定义报错；
```JavaScript
for(let i=0;i<3;i++){ //（）也是个块级作用域，所以不在同一个作用域下，不是重复定义
    let i = 'abc';
    console.log(i); //abc
}
```
* const必须定义时赋值，不能修改
```JavaScript
const arr = ['apple','banana'];
arr.push('orange');
console.log(arr);//['apple','banana','orange']
//arr为对象，引用类型，指针并没有修改

const arr = Object.freeze(['apple','banana']);
//这样就被冻结不能修改对象了
```

TDZ：定义前使用，报未定义错误，称为TDZ死区

**之前没有块级作用域，使用匿名函数模拟IIFE**
```JavaScript
(function(){
    //TODO
})()
```

-------
### 2. 解构赋值
左右两边结构要一致
```JavaScript
let [a,b,c] = [2,4,5];
```
也可以解构json

-------
### 3. 字符串模板``
```JavaScript
let a = `咋上的${变量}萨芬`;
```

字符串查找:

    str.indexOf(要找的东西)  返回索引(位置),没找到返回-1;

    str.includes(要找的东西) 返回true/false

字符串是否以**开头(如解析http和https)

    str.startsWith(要找的东西) 返回true/false

字符串是否以**结束(如解析文件类型)

    str.endsWith(要找的东西) 返回true/false

重复字符串(很少用)

    str.repeat(次数)

填充字符串(很少用)

    str.padStart(填充后整个字符串长度,填充的字符),往前填充

    str.padEnd(整个字符串长度,),往后填充

-------
### 4. 函数

1.函数默认参数
```JavaScript
function show({x=0,y=0}={}){
    console.log(x,y);
}
show();
```

2.函数参数默认已经定义了,不能再使用let,const声明
```JavaScript
function show(a=19){
    let a = 101 //错误
}
```

3.扩展剩余运算符...
```JavaScript
let arr=['a','b','c'];
console.log(...arr); //a b c

function show(a,...b){
    console.log(a);// 1
    console.log(b);// [2,3,4,5]剩余参数
}
show(1,2,3,4,5);
```

```JavaScript
let arr = [3,4,8,6,2];
let arr2 = [...arr]; //复制数组
let arr3 = Array.from(arr);//以前复制数组的方法

arr.shot(); //排序
```

4.箭头函数
```JavaScript
let show = (a,b)=>{
    console.log(a+b);
}
show(2,3);
```
**==注意:==**
* 箭头函数中的this,是定义函数的对象
* 箭头函数中没有arguments,用...args
* 箭头函数不能当构造函数
* json对象中不要用箭头函数