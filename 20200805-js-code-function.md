# js-code-function

> 出自小程序前端面试星球
>
> 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function

### 题目

```javascript
// 以下代码输出
const a = Function.length;
const b = new Function().length;
console.log(a === b)
```



### 解题

#### 思路

* 函数的`length`属性，表示的形参的数量，并不是实际参数的数量，而是需要传入参数的数量，包括第一个具有默认值之前的参数的个数
* `Function`也是一个函数，他必传的参数只有1个，所以`a = 1`，而`b`是一个新生成函数的长度，他并没有形参，`b = 0`

#### 代码

```javascript
const a = Function.length; // 1
const b = new Function().length; // 0
console.log(a === b) // false

const sum = new Function('a', 'b', 'return a + b'); // sum.length = 2
const sum3 = (a, b = 2) => a + b // sum3.length = 1
const sum4 = (a, b = 2, c) => a + b + c // sum4.length = 1
```



### 思考

* 有关于`Field declarations`，可以看
  * https://zhuanlan.zhihu.com/p/47310567
  * https://github.com/tc39/proposal-class-fields