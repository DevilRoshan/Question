# js-code-transfrom

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
const value = 'Value is' + !!Number(['0']) ? 'XXX' : 'undefined'
console.log(value)
```



### 解题

#### 思路

* `+`优先级大于`?`
* 所以先拼接，拼接后的字符串转化为`true`，所以返回`XXX`
* `!!Number(['0'])`，返回`false`，`Number`转换参数是，会首先试图转换为数字，如果无法转换则会返回`NaN`，对于数组，如果只有一项，则会转换这一项，否则返回`NaN`

#### 代码

```javascript
// 以下代码输出
const value = 'Value is' + !!Number(['0']) ? 'XXX' : 'undefined'
console.log(value) // 'XXX'
```



### 思考

