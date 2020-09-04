# js-code-this

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
function f(){
  return f;
}
console.log(new f() instanceof f)
```



### 解题

#### 思路

* 如果没有`return f`，则这个`new f()`生成的实例是`f`的实例，但是`return`修改了`new`的返回值，返回为`f`函数对象(返回的是什么无关，主要是修改了构造函数的返回)，这个对象不是`f`的实例
* 第二种情况返回为true，虽然也修改了返回值，但修改返回的是一个继承自f的对象，所以依然是true
* 主要是看`__proto__ === f.prototype`是否成立

#### 代码

```javascript
// 以下代码输出
function f(){
  return f;
}
console.log(new f() instanceof f) // false

function f(){
  return Object.create(f.prototype);
}
console.log(new f() instanceof f) // true
```



### 思考