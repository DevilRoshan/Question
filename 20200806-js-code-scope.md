# js-code-scope

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var a = 0;
if(true){
  a = 10;
  console.log(a, window.a);
  function a(){}
  console.log(a, window.a);
  a = 20;
  console.log(a, window.a);
}
console.log(a)
```



### 解题

#### 思路

* 涉及到变量声明和变量提升，以及作用域相关的知识
* 作用域分为函数作用域和块级作用域，函数作用域就是一个函数的作用域，所有同步代码可以认为是一个`main`函数，块级作用域就是`if for`等语句块
* 函数的声明会在函数作用域内提前声明一个同名变量值为`void 0`，然后在函数所在块级作用域最顶层进行变量覆盖
* 块级作用域中函数只有执行函数声明语句才会将其对应的全局作用域上的变量重新赋值

#### 代码

```javascript
// 以下代码输出
var a = 0;
if(true){
  a = 10;
  console.log(a, window.a); // 10, 0
  function a(){};
  console.log(a, window.a); // 10, 10
  a = 20;
  console.log(a, window.a); // 20, 10
}
console.log(a); // 10
// 代码转换为以下片段
var a = void 0 // undefined 首先在函数作用域内声明变量
var a = 0;
if(true){
  a = function(){}; // 提升在块级作用域内赋值
  a = 10;
  console.log(a, window.a); // 作用域内函数a这个变量被覆盖为10，但是并未同步到函数作用域
  function a(){}; // 此处仅剩函数声明，用作同步变量使用，此处执行之后会同步比函数变量到全局作用域
  console.log(a, window.a); // 同步以后，两者相同
  a = 20;
  console.log(a, window.a); // 重新赋值，并未同步
}
console.log(a); // 此处获取的就是最后一次同步的值
```



### 思考

* 此处的结论并不普适，在不同浏览器表现不同
* 有关于作用域的相关，会做一期周任务，此处结论可能会更改
* 总结一句话，慎用`function`声明函数