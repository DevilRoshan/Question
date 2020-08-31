# js-code-call-bind

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
const person = { name: 'XXX' };

function sayHi(age) {
  return `${this.name} is ${age}`
}

console.log(sayHi.call(person, 5))
console.log(sayHi.bind(person, 5))
```



### 解题

#### 思路

* call是调用，bind是绑定，绑定返回是一个参数固定的函数
* call等于bind的执行

#### 代码

```javascript
// 以下代码输出
const person = { name: 'XXX' };

function sayHi(age) {
  return `${this.name} is ${age}`
}

console.log(sayHi.call(person, 5)) // XXX is 5
console.log(sayHi.bind(person, 5)) // ƒ sayHi(age) { return `${this.name} is ${age}`}

let x = sayHi.bind(person, 5); console.log(x()) // XXX is 5
```





### 思考
