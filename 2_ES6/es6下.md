## 1. 类class

面向对象 ，类（属性，方法）:

之前：函数模拟
```JavaScript
function Person(name,age){
	this.name=name;
	this.age=age;
}
/* Person.prototype.showName = function(){
	console.log(`名字为:${this.name}`);
} */

//也可以
object.assign(Person.prototype,{
	showName(){
		console.log(`名字为:${this.name}`);
	},
	showAge(){
		console.log(`名字为:${this.age}`);
	}
});

let p1 = new Person('张三',18);
p1.showName();
```

现在：ES6中class
```JavaScript
class Person{
	let aaa = 'showAge';
	constructor(name,age){ //构造方法,只要调用new,就自动执行
		this.name = name;
		this.name = age;
	} 
	showName(){}
	[aaa](){}
}
let p1 = new Person('张三',18);
p1.showName();
p1[aaa](); //或者p1.showAge();
```

注意：

1. ES6里面class没有提升功能，在ES5，用函数模拟可以，默认函数提升
2. ES6里面this 比之前轻松多了

矫正this:

1. fn.call(this指向谁, args1, args2....)
2. fn.apply(this指向谁, [args1, args2....])
3. fn.bind(this指向谁) //只矫正this

---
class里面取值函数(getter), 存值函数(setter)

```JavaScript
class Person{
	constructor(){}
	get aaa(){
		return `aaa的属性`;
	}
	set aaa(val){
		console.log(`设置aaa的属性,值为${val}`);
	}
}
let p1 = new Person();
p1.aaa = '123';
console.log(p1.aaa);
```

---

静态方法: 就是类身上方法

```JavaScript
class Person{
	constructor(){}
	show(){}
	static aaa(){}
}
let p1 = new Person();
p1.show();

Person.aaa();
```

---

### 继承

之前:
```JavaScript
//父类
function Person(name){
	this.name = name;
}
Person.prototype.showName = function(){
	return `名字是:${this.name}`;
}
//子类
function Student(name,skill){
	Person.call(this); //继承属性
	this.skill = skill;
}
//继承方法:实现一
Student.prototype = new Person();
//继承方法:实现二
Student.prototype = Object.create(Person.prototype);

Student.prototype.constructor= Student;//矫正constructor

/*两者的区别:
第一种调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）,即Student.prototype下多了个父类的name=undefined
所以尽量用第二种继承的实现方法
*/

//调用
var stu1 = new Student('张三','逃学');
console.log(stu1.name);
console.log(stu1.showName());
```

现在: extends

```JavaScript
//父类
class Person{
	constructor(name){
		this.name = name;
	}
	showName(){
		return `名字是:${this.name}`;
	}
}
//子类
class Student extends Person{
    constructor(name,skill){
		super(name);
		this.skill = skill;
	}
}
//调用
let stu1 = new Student('张三','写作业');
console.log(stu1.name);
console.log(stu1.showName());
```

---
---
## 2. Symbol & generator

数据类型：
> Number、String、Boolean、Object、Undefined、Null

用typeof检测出来数据类型

定义
```JavaScript
let syml = Symbol('aaa');
```
注意:
1. Symbol 不能new
2. Symbol() 返回是一个唯一值
> 坊间传说, 做一个key，定义一些唯一或者私有一些东
3. symbol是一个单独数据类型，就叫 symbol, 基本类型
4. 如果symbol作为key，用for in循环，出不来

---
箭头函数
> () =>{}

generator函数
> 生成器
>
> 解决异步深度嵌套的问题， async

语法:
```JavaScript
// 正常函数:
function show(){}

//generator函数,加*的函数
function * show(){
	//通常配合yield使用
}
```
例子:
```JavaScript
function * gen(){
	yield 'welcome';
	yield 'to';
	return '张三';
}
let g1 = gen();
//手动调用很麻烦
console.log(g1.next());
console.log(g1.next());
console.log(g1.next());
//自动调用
for(let val of g1){ //只遍历yield
	console.log(val);
}
//解构
let[a,b]=gen(); //a:welcome,b:to,只解构yield
//扩展运算符
console.log(...gen()); //welcome to
//Array.from
console.log(Array.from(gen())); //welcome to
```

异步: 不连续，上一个操作没有执行完，下一个操作照样开始

同步: 连续执行，上一个操作没有执行完，下一个没法开始

关于异步，解决方案：

	a). 回调函数
	b). 事件监听
	c). 发布/订阅
	d). Promise对象

---
---
## 3. async、await
例子,nodeJs读取文件  fs.readFile
```JavaScript
const fs = require('fs');

//简单封装  fs封装成一个promise对象
const readFile = function (fileName){
    return new Promise((resolve, reject) =>{
        fs.readFile(fileName, (err, data) =>{
            if(err) reject(err);
            resolve(data);
        });
    });
}

//1.使用promise方式读取文件内容
readFile('data/a.txt').then(res=>{
    console.log(res.toString());
    return readFile('data/b.txt');
}).then(res=>{
    console.log(res.toString());
    return readFile('data/c.txt');
}).then(res=>{
    console.log(res.toString());
})

//2.使用generator方式读取
function * gen(){
    yield readFile('data/a.txt');
    yield readFile('data/b.txt');
    yield readFile('data/c.txt');
}
let g1 = gen();

g1.next().value.then(res=>{
    console.log(res.toString());
    return g1.next().value;
}).then(res=>{
    console.log(res.toString());
    return g1.next().value;
}).then(res=>{
    console.log(res.toString());
})

//3.使用async方式读取
async function fn(){
	//let a = await readFile('data/a.txt');
	//let b = await readFile('data/b.txt');
	//let c = await readFile('data/c.txt');
    let [a,b,c] = await Promise.all([ //一个失败整个终止
        readFile('data/a.txt'),
        readFile('data/b.txt'),
        readFile('data/c.txt'),
    ]);
    console.log(a.toString());
    console.log(b.toString());
    console.log(c.toString());
}
fn();
```

语法:
```JavaScript
async function fn(){  //表示异步，这个函数里面有异步任务
	let result = await  xxx	//表示后面结果需要等待
}
```
async特点:

	1. await只能放到async函数中
	2. 相比genrator语义化更强
	3. await后面可以是promise对象，也可以数字、字符串、布尔
	4. async函数返回是一个promise对象
	5. 只要await语句后面Promise状态变成 reject, 那么整个async函数会中断执行

如何解决async函数中抛出错误，影响后续代码:
```JavaScript
//一种
try{}catch(e){}
//另一种
promise本身catch
```

个人建议:

```JavaScript
try{
	let f1 = await readFile('data/a.txt');
	let f3 = await readFile('data/c.txt');
	let f2 = await readFile('data/b.txt');
}catch(e){}
```

---
---
## 4. Set和WeakSet
set:

	类似数组，但是里面不能有重复值

数组:
```
let arr  = ['a','b','a'];
let arr = new Array();
```

set用法:

```JavaScript
let setArr = new Set(['a','b']);

setArr.add('a'); //往setArr里面添加一项,不能重复
setArr.delete('b'); //删除一项
setArr.has('a'); //判断setArr里面有没有此值
setArr.size; //个数
setArr.clear(); //清空
```

for...of...

循环:

```JavaScript
let setArr = new Set(['a','b','c','d']);

for(let item of setArr){  //默认是values()
	console.log(item); //a,b,c,d
}
for(let item of setArr.keys()){
	console.log(item); //a,b,c,d
}
for(let item of setArr.values()){
	console.log(item); //a,b,c,d
}
for(let [k,v] of setArr.entries()){
	console.log(k,v); //a a,b b,c c,d d
}
setArr.forEach((value,index) =>{
	console.log(value, index); //a a,b b,c c,d d
});
```

let setArr = new Set().add('a').add('b').add('c');

数组去重:

```JavaScript
let arr = [1,2,3,4,5,6,7,6,5,4,3,2,1,2,3,4,4];
let newArr = [...new Set(arr)];
console.log(newArr);
```

set数据结构变成数组:

	[...set]

想让set使用数组的，map循环和filter:
```JavaScript
let set = new Set([1,2,3]);
set = new Set([...set].map(val=>val*2));
let set2 = new Set([...set].filter(val=>val%2==0));
console.log(set); //{2,4,6}
console.log(set2); //{2}
```

new Set([]);存储数组，这种写法对

new WeakSet();存储json，初始往里面添加东西，是不行的。不使用

WeakSet:
> 没有size，也没有clear();
> 有， add(), has(), delete()

---
---

## 5. Map和WeakMap

map:

	类似json
	json的key只能是字符串
	map的key可以是任意类型

使用:
```JavaScript
let map = new Map();

map.set(key,value); //设置一个值
map.get(key); //获取一个值
map.delete(key); //删除一项
map.has(key); //判断有没有
map.clear(); //清空
```

循环
```JavaScript
for(let [key,value] of map){}
for(let key of map.keys()){}
for(let value of map.values()){}
for(let [k,v] of map.entries()){}
map.forEach((value, key) =>{
	console.log(value, key);
})
```

WeakMap():  key只能是对象

总结：

	Set	里面是数组，不重复，没有key，没有get方法

	Map 对json功能增强，key可以是任意类型值

---
---

## 6. 数字变化和Math新增的东西

二进制(binary):

	let a = 0b010101;  //0b开头+二进制
	console.log(a);  //十进制21

八进制(octal):

	let a = 0o666;   //0o开头+八进制
	console.log(a);  //十进制438

判断是否为数字,以前:

Nunber()、parseInt()、 parseFloat()

现在:

Number.isNaN(NaN)	-> true

Number.isFinite(a)   判断是不是数字	√

Number.isInteger(a)  判断数字是不是整数	√

Number.parseInt();
Number.parseFloat();

2**3 //2的3次方

安全整数:

	-(2**53-1) 到 (2**53-1)
	Number.isSafeInteger(a); //是否为安全整数
	Number.MAX_SAFE_INTEGER	最大安全整数
	Number.MIN_SAFE_INTEGER	最小安全整数

Math:
```JavaScript
Math.abs(); //返回绝对值
Math.sqrt(); //返回数的平方根
Math.sin(); //返回数值的正弦值

Math.trunc(); //截取，只保留整数部分
	Math.trunc(4.5)  ->  4
	Math.trunc(4.9)  ->  4

Math.sign(-5); //判断一个数到底是正数、负数、0
	Math.sign(-5)  ->  -1
	Math.sign(5)  -> 1
	Math.sign(0)	->  0
	Math.sign(-0)	->  -0
	其他值，返回 NaN
	
Math.cbrt(); //计算一个数立方根
	Math.cbrt(27)  ->  3
```

---
---

## 7. ES2018新增的东西

1. 命名捕获

> 语法:  (?<名字>)
```JavaScript
let str = '2018-03-20';
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
let {year, month ,day} = str.match(reg).groups;
console.log(year, month, day);
```

反向引用命名捕获:
> 语法:  \k<名字>
```JavaScript
let reg = /^(?<Strive>welcome)-\k<Strive>$/;
//匹配: ‘welcome-welcome’
let reg = /^(?<Strive>welcome)-\k<Strive>-\1$/;
//匹配: 'welcome-welcome-welcome'
```

替换:
> 语法:  $<名字>
```JavaScript
let str = '2018-12-03'
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
str = str.replace(reg,'$<day>/$<month>/$<year>');
console.log(str); // 03/12/2018
//也可以
str = str.replace(reg, (...args)=>{
	//console.log(args)
	let {year, month, day} = args[args.length-1];
	return `${day}/${month}/${year}`;
});
console.log(str);
```

2. dotAll 模式s

之前 '.' 在正则里表示匹配任意东西， 但是不包括 \n
```
let reg = /\w+/gims; //s就是dotAll模式
```

3. 标签函数

```JavaScript
function fn(){}
fn()  //这样调用就是普通函数
fn`aaa`  //标签函数使用

function fn(args){
	return args[0].toUpperCase();
}
console.log(fn`welcome`);
```

---
---

## 8. Proxy的使用
Proxy:代理
> 扩展(增强)对象、方法(函数)一些功能

比如:Vue
> Vue.config.keyCodes.enter=65
Proxy作用: 比如vue中拦截
> 预警、上报、扩展功能、统计、增强对象等等

proxy是设计模式一种，代理模式
```
let obj ={
	name:'Strive'
};
//您访问了name
obj.name  // Strive
```

语法:
```JavaScript
new Proxy(target, handler);
new Proxy(被代理的对象,对代理的对象做什么操作)

handler:
{
	set(){},  //设置干的事情
	get(){},  //获取干的事情
	deleteProperty(){},  //删除拦截
	has(){}  //检测有没有这个东西  ‘xxx’ in obj
	apply()  //调用函数处理,拦截方法
	.....
}
```
如:
```JavaScript
let obj = {
	name:'Strive'
};
let newObj = new Proxy(obj,{
	get(target, property){
		//console.log(target, property);
		console.log(`您访问了${property}属性`);
		return target[property];
	}
});

console.log(newObj.name); //访问name前代理一些事情
```
访问一个对象身上属性，默认不存在的时候返回undefined，希望如果不存在拦截给出错误(警告)信息：
```JavaScript
let obj = {
	name:'Strive'
};
let newObj = new Proxy(obj,{
	get(target, property){
		if(property in target){
			return target[property];
		}else{
			return '不存在';
		}
	}
});

console.log(newObj.age); //不存在属性,希望返回错误而不是undefined
```

---
---

## 9. Reflect的使用
apply(target, context, args){}
Reflect.apply(调用的函数，this指向，参数数组);

fn.call()
fn.apply()  类似

Reflect: 反射

	Object.xxx  语言内部方法
		Object.defineProperty
	放到Reflect对象身上
	通过Reflect对象身上直接拿到语言内部东西

	'assign' in Object    ->   Reflect.has(Object, 'assign')

	delete json.a	    ->   Reflect.deleteProperty(json, 'a');