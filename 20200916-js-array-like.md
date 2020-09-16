# js-array-like

> 出自小程序前端面试星球

### 题目

如何判断一个对象是否是数组



### 解题

#### 思路

通过原型链，或者API，或者toString方法

#### 代码

```javascript
// 原型
[] instanceof Array
[].constructor === Array

// API
Array.isArray([])
Array.prototype.isPrototypeOf([])

// toString
Object.prototype.toString.call([]) === '[object Array]'
```





### 思考

