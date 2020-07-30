# js-code-prototype

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var F = function(){}
Object.prototype.a = function(){console.log('a')}
Function.prototype.b = function(){console.log('b')}
var f = new F()

F.a()
F.b()
f.a()
f.b()
```



### 解题

#### 思路

* 构造函数是对象，也是`Function`构造函数的实例
* 构造函数的实例，是F的实例，不是构造函数的实例，是对象的实例，new关键字是新创建一个对象，然后把函数的`prototype`中的值赋给这个对象，而不是`__proto__`

#### 代码

```javascript
var F = function(){}
Object.prototype.a = function(){console.log('a')}
Function.prototype.b = function(){console.log('b')}
var f = new F()

F.a() // a
F.b() // b
f.a() // a
f.b() // 报错
```



### 思考

