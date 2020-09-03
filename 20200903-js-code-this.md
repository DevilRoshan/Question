# js-code-this

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var foo = {
  bar: function() {
    return this.baz
  },
  baz: 1
}
console.log(typeof (f = foo.bar)())
```



### 解题

#### 思路

* 将对象的函数复制给一个全局变量`window.f = foo.bar`，然后调用，是`window.f()`调用的，而不是`foo.bar()`调用。所以这个`this.baz`是`window`上的，所以是`undefined`

#### 代码

```javascript
// 以下代码输出
var foo = {
  bar: function() {
    return this.baz
  },
  baz: 1
}
console.log(typeof (f = foo.bar)()) // undefined
```



### 思考