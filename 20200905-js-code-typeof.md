# js-code-typeof

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var foo = function bar(){ return 12; };
console.log(typeof bar())
```



### 解题

#### 思路

* 命名函数表达式函数只呢能在函数体内生效，在外面要使用赋值给的变量

#### 代码

```javascript
// 以下代码输出
var foo = function bar(){ return 12; };
console.log(typeof bar()) // 报错，抛出异常

var foo = function bar(){ 
  console.log('111', typeof bar) // 这样可以访问到
  return 12; 
};foo()
```



### 思考

