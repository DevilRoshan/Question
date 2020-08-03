# js-code-prototype

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
function func(){}
const a = {}, b = Object.prototype;
console.log(a.prototype === b);
console.log(Object.getPrototypeOf(a) === b);
console.log(func.prototype === Object.getPrototypeOf(func))
```



### 解题

#### 思路

* `prototype`是构造函数的属性，是以这个构造函数生成的实例的原型指向的对象
* `getPrototypeOf`获取一个对象的原型
* `func.prototype === Object.getPrototypeOf(new func()) `函数的`prototype`等于以这个函数生成的实例的原型

#### 代码

```javascript
// 以下代码输出
function func(){}
const a = {}, b = Object.prototype;
console.log(a.prototype === b); // false
console.log(Object.getPrototypeOf(a) === b); // true
console.log(func.prototype === Object.getPrototypeOf(func)) // false
```



### 思考

