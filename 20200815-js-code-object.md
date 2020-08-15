# js-code-extend

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
function Foo() {
  Foo.a = function(){
    console.log(1)
  }
  this.a = function(){
    console.log(2)
  }
}
Foo.prototype.a = function(){
  console.log(3)
}
Foo.a = function(){
  console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a()
```



### 解题

#### 思路

* 最开始执行`Foo.a`返回`4`，直接执行函数
* 后来`new`创建实例之后，执行了`Foo`函数，`Foo.a`被重新赋值，所以以后的`Foo.a`都是输出`1`
* 实例的内部属性比原型属性优先级高，所以`obj.a`输出`2`

#### 代码

```javascript
// 以下代码输出
function Foo() {
  Foo.a = function(){
    console.log(1)
  }
  this.a = function(){
    console.log(2)
  }
}
Foo.prototype.a = function(){
  console.log(3)
}
Foo.a = function(){
  console.log(4)
}
Foo.a(); // 4
let obj = new Foo();
obj.a(); // 2
Foo.a(); // 1
```



### 思考

