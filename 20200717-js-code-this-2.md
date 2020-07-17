# js-code-this-2

### 题目

以下代码执行结果

```
var length = 10;
function fn() {
  console.log(this.length)
}
var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
}
obj.method(fn, 1)

function a(xx){
  this.x = xx;
  return this;
}
var x = a(5);
var y = a(6);

console.log(x.x)
console.log(y.x)
```



### 解题

#### 思路

* 第一个
  * 匿名调用则是默认`window`
  * `arguments`执行则是以`arguments`为`this`
* 第二个
  * 注意对`window`属性的覆盖，和执行代码的顺序

#### 代码

```
var length = 10;
function fn() {
  console.log(this.length)
}
var obj = {
  length: 5,
  method: function(fn) {
    fn(); // 10 // fn的执行等于window.fn() => window.lenght => 10
    arguments[0](); // 2 // arguments[0]() => arguments.fn() => arguments.length等于2
  }
}
obj.method(fn, 1)



// 第二题解释
function a(xx){
  this.x = xx; // window.x = xx
  return this;
}
var x = a(5);
// 等价于执行
window.x = 5
window.x = window

var y = a(6);
// 等价于执行
window.x = 6
window.y = window

console.log(x.x) // undefined
window.x.x = 6.x = undefined

console.log(y.x) // 6
window.y.x = 6
```





### 思考

* 箭头函数的this指向父级作用域
* 点语法优先于其他语法