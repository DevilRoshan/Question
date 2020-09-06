# js-code-typeof

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var x = 1;
if(function f(){}){
  x += typeof f;
}
console.log(x)
```



### 解题

#### 思路

* 函数为对象，所以转化为true
* 运算符中的函数声明，在执行阶段找不到，所以是`undefined`

#### 代码

```javascript
// 以下代码输出
var x = 1;
if(function f(){}){
  x += typeof f;
}
console.log(x) // 1undefined
```



### 思考

条件判断为false的情况：`0`，`false`，`""`， `null`，`undefined`，未定义对象。