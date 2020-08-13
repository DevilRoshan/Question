# js-code-this

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var a = 10;
var foo = {
  a: 20,
  bar: function(){
    var a = 30;
    return this.a
  }
}
console.log(foo.bar());
console.log((foo.bar)());
console.log((foo.bar=foo.bar)());
console.log((foo.bar, foo.bar)());
```



### 解题

#### 思路

* 第一个`foo.bar`，`foo`调用，`this`指向`foo`，返回`20`
* 第二个，括号最后会返回括号内部表达式的值，这里返回也是`foo.bar`，结果与第一个相同
* 第三个，赋值语句的返回是`foo.bar`这个函数。是个匿名函数，最后由`window`调用，而不是`foo`调用
* 第四个，括号最后返回的是一个逗号表达式中的最后一个，也是个匿名函数，结果与第三个相同

#### 代码

```javascript
// 以下代码输出
var a = 10;
var foo = {
  a: 20,
  bar: function(){
    var a = 30;
    return this.a
  }
}
console.log(foo.bar()); // 20
console.log((foo.bar)()); // 20
console.log((foo.bar=foo.bar)());// 10
// => 等价于 (foo.bar=foo.bar) = (function(){var a = 30;return this.a})()，这里的函数是window调用
console.log((foo.bar, foo.bar)());// 10
```



### 思考

