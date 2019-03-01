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

---
---
## 5. Map和WeakMap


---
---
## 6. 数字变化和Math新增的东西


---
---
## 7. ES2018新增的东西

---
---
## 8. Proxy的使用


---
---
## 9. Reflect的使用