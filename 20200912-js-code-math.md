# js-code-math

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var min = Math.min(), max = Math.max();
console.log(min < max);
```



### 解题

#### 思路

* `Math.min`，如果不传参数返回无穷大
* `Math.max`，如果不传参数返回负无穷大

#### 代码

```javascript
// 以下代码输出
var min = Math.min(), max = Math.max();
console.log(min < max); // false
```



### 思考

