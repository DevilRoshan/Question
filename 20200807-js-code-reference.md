# js-code-reference

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
const value = {number: 10};
const multiply = (x => { ...value }) => {
  console.log(x.number *= 2);
}
multiply();
multiply();
multiply(value);
multiply(value);
```



### 解题

#### 思路

* 前两个没有传参，所以等价于，使用扩展运算符生成的新对象，与旧对象不是一个相同的引用，所以不修改原对象的值
* 而后两个将value传入函数中，修改对象，所以修改了value中的值

#### 代码

```javascript
// 以下代码输出
const value = {number: 10};
const multiply = (x => { ...value }) => {
  console.log(x.number *= 2);
}
multiply(); // 20
multiply(); // 20
multiply(value); // 20
multiply(value); // 40
```



### 思考
