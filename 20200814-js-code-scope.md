# js-code-scope

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
let x, y;
try {
  throw new Error();
} catch (x) {
  x=1;
  y=2;
  console.log(x)
}
console.log(x);
console.log(y)
```



### 解题

#### 思路

* 第一个`x`的输出是因为上面代码对`x`赋值，所以输出`1`，
* 但这个作用域中，有个参数是`x`，所以这里的赋值是对块作用域内部的变量赋值，而外层的`x`并没有被赋值，所以第二个输出为`undefined`
* 第三个赋值成功

#### 代码

```javascript
// 以下代码输出
let x, y;
try {
  throw new Error();
} catch (x) {
  x = 1; // 这里的赋值只是对参数x的修改，而不是对全局作用域中的x赋值
  y = 2;
  console.log(x); // 1
}
console.log(x); // undefined
console.log(y); // 2
```



### 思考

