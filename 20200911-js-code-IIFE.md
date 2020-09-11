# js-code-IIFE

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var a = 1;
(function a(){
  a = 2;
  console.log(a)
})();
```



### 解题

#### 思路

* 首先立即执行函数是自己的独立作用域，如果函数名和内部变量冲突，会执行函数本身

#### 代码

```javascript
// 以下代码输出
var a = 1;
(function a(){
  a = 2;
  console.log(a) // function a (){...}
})();
```



### 思考

