# js-code-array

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var arr = [0, 1];
arr[5] = 5;
newArr = arr.filter(function(x){ x === undefined });
console.log(newArr.length)
```



### 解题

#### 思路

* 因为初始化的时候，并没有声明，arr的2-4位元素，所以，array的函数执行调用时，会跳过这个，所以返回时个空数组

#### 代码

```javascript
// 以下代码输出
var arr = [0, 1];
arr[5] = 5;
newArr = arr.filter(function(x){ console.log(x) return x === undefined });
console.log(newArr.length) // 0
```



### 思考

