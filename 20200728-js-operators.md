# js-operators

> 出自小程序前端面试星球

### 题目

以下代码的执行结果

```javascript
const obj = {};
var x = +obj.xxx?.name ?? 'xxx'
console.log(x);
```



### 解题

#### 思路

* `?`标识可选链操作，当取属性为`null`或者`undefined`时，不会引发错误异常，而是返回`undefined`
* `??`空值合并运算符，当左侧为`null`或者`undefined`时，返回右侧的值，类似于容错
* 所以，在`+`之后的值时`xxx`，因为`+`后面接了一个非数字，所以返回`NaN`

#### 代码

```javascript
const obj = {};
var x = +obj.xxx?.name ?? 'xxx'
console.log(x);// NaN

var x = obj.xxx?.name ?? 'xxx'
console.log(x); //xxx
```



### 思考

* 空置合并运算符：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
* 可选链操作符：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/可选链)

