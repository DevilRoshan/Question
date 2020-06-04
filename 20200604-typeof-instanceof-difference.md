# typeof-instanceof-difference

> 参考链接：https://blog.csdn.net/qq_41409353/java/article/details/105524162

### 题目

typeof和instanceof的区别



### 解题

#### 思路

* typeof 检测一个变量的类型，一般是6种：`Undefined,Null,Boolean,String,Number,Object`，es6新增了Symbol。而像数组，set等都属于特殊的对象，不属于类型。
* instanceof 检测一个函数的**原型**是否存在与另一个对象的**原型链**当中

#### 代码

```
 // typeof
 var a = [34,4,3,54],
     b = 34,
     c = '111',
     d = function(){console.log('我是函数')},
     e = true,
     f = null,
     g;
     
console.log(typeof(a));//object
console.log(typeof(b));//number
console.log(typeof(c));//string
console.log(typeof(d));//function
console.log(typeof(e));//boolean
console.log(typeof(f));//object
console.log(typeof(g));//undefined

// instanceof
([]) instanceof Array // true
Array instanceof Object // true
([]) instanceof Object // true

({}) instanceof Object // true

(function (){}) instanceof Object // true
(function (){}) instanceof Function // true
Function instanceof Object // true

(true) instanceof Object // false
(undefined) instanceof Object// false
(111) instanceof Object // false
(111) instanceof Number // false

function Grandefather(){}
function Father(){}
function Son(){}

// 自定义函数的例子
var g = new Grandefather()
Father.prototype = g  //此处这个Father函数的原型 继承了 g 这个实例对象的原型链

var f = new Father() // 然后新创建的实例就能能够 通过instanceof 检测该实例的原型是否存在于 Grandfather 的原型链上
        
Son.prototype = f
var s = new Son()
        
console.log(f instanceof Grandefather) //true
console.log(s instanceof Father) //true
console.log(s instanceof Grandefather) //true
```



### 思考

* 一个是判断类型，对所有变量适用
* 一个是判断原型链，只对引用类型使用，且只判断引用类型的原型链上是否有某个函数的原型。



### 扩展

* 函数，数组都属于对象的一种特殊表现，但是函数是类型的一种，而数组不是
* 关于js引用类型的原型链以及原型链和原型的理解会再做一个周任务，