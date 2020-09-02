# js-code-scope

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
for(let i = 0; i < 3; i++){
  setTimeout(() => console.log(i), 1);
}
```



### 解题

#### 思路

* `let`声明变量在块级作用域是单独绑定的，类似于创建闭包，所以输出的`i`是每次执行的`i`

#### 代码

```javascript
// 以下代码输出
for(let i = 0; i < 3; i++){
  setTimeout(() => console.log(i), 1); // 0, 1, 2
}
```



### 思考