# js-code-reduce

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
console.log([2, 1, 0].reduce(Math.pow))
console.log([].reduce(Math.pow))
```



### 解题

#### 思路

* reduce如果没有传入初始值，则会选择数组中的第一个值最为初始值
* 回调函数的参数为，累加值和初始值，所以`Math.pow(acc, cur)`

#### 代码

```javascript
// 以下代码输出
console.log([2, 1, 0].reduce(Math.pow)) // 1
// Math.pow(2, 1) => 2 // 第一个2是初始值
// Math.pow(2, 0) => 1
// 这个输出可能会更好一点 console.log([2, 2, 2].reduce(Math.pow)) // 16
console.log([].reduce(Math.pow)) // 报错
// 数组中一项都没有，则直接没有初始值，报错
```





### 思考

