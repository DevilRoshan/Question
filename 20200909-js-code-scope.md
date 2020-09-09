# js-code-scope

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
(function(){
  var a = (b = 5)
})()
console.log(b);
console.log(a);
```



### 解题

#### 思路

* `a`是用`var`声明中在`IIFE[立即执行函数表达式]`中，所以是一个局部变量，所以外界访问不到
* 而`(b = 5)`，这个表达式，是给`b`赋值，局部作用域没有`b`则修改的是全局作用域的`b`

#### 代码

```javascript
// 以下代码输出
(function(){
  var a = (b = 5)
  // 等价于
  // var a = (window.b = 5)
  // var a = window.b = 5
  // 但是
  // var a = b = 5 这个也是报错，b is not defined
})()
console.log(b); // 5
console.log(a); // a is not defined
```



### 思考

