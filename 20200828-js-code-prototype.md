# js-code-prototype

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
function f(){}
const a = f.prototype, b = Object.getPrototypeOf(f)
console.log(a === b);
```



### 解题

#### 思路

* `f.prototype`是使用`new`创建的`f`实例的原型属性
* `Object.getPrototypeOf`是回去一个对象的原型属性，等于这个对象的`prototype`属性
* `f.prototype === Object.getPrototypeOf(new f())`
* `Object.getPrototypeOf(f) === Function.prototype `

#### 代码

```javascript
// 以下代码输出
function f(){}
const a = f.prototype, b = Object.getPrototypeOf(f)
console.log(a === b); // false
```





### 思考

