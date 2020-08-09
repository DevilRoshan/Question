# js-code-scope

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var x = 20;
var tmp = {
  x: 40,
  foo: function() {
    var x = 10;
    console.log(this.x)
  }
}
(tmp.foo, tmp.foo)()
```



### 解题

#### 思路

* 逗号操作符，从左到右进行计算括号内部的操作数，返回最后一个操作数的的值，所以最后返回的只是一个函数，而不是对象调用这个函数，所以`this`指向`window`。

#### 代码

```javascript
// 以下代码输出
var x = 20;
var tmp = {
  x: 40,
  foo: function() {
    var x = 10;
    console.log(this.x)
  }
}
(tmp.foo, tmp.foo)() // 20
// 等价于
// tmp.foo = func
// (func, func) => func // 返回的是对象的值，而不是对象的调用
// tmp.foo() => 40 // 这样执行是函数的调用
// func()
var func = tmp.foo; func()
```



### 思考
