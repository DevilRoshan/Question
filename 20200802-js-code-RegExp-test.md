# js-code-RegExp-test

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
const lowerCaseOnly = /^[a-z]+$/;
console.log(lowerCaseOnly.test('str'));
console.log(lowerCaseOnly.test(null));
console.log(lowerCaseOnly.test());
```



### 解题

#### 思路

* test将传入的值转换为字符串使用`toString()`

#### 代码

```javascript
// 以下代码输出
const lowerCaseOnly = /^[a-z]+$/;
console.log(lowerCaseOnly.test('str')); // true
console.log(lowerCaseOnly.test(null)); // true
console.log(lowerCaseOnly.test()); // true
```



### 思考

