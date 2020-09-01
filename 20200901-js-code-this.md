# js-code-this

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
const num = {
  a: 10,
  add() {
    return this.a + 2;
  },
  reduce: () => this.a - 2;
}
console.log(num.add())
console.log(num.reduce())
```



### 解题

#### 思路

* 第一个函数的this是绑定num的this
* 第二个是箭头函数，指声明时的this，是全局的this，`undefined - 2 = NaN`

#### 代码

```javascript
// 以下代码输出
// 以下代码输出
const num = {
  a: 10,
  add() {
    return this.a + 2;
  },
  reduce: () => this.a - 2;
}
console.log(num.add()) // 12
console.log(num.reduce()) // NaN
```



### 思考