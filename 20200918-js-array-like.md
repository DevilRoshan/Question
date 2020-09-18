# js-array-like

> 出自小程序前端面试星球

### 题目

如何处理类数组对象



### 解题

#### 思路

```javascript
// 类数组对象
// 可以用下标访问，有length，但是没有数组操作的API
var arrlike = {
  0: 'JS',
  1: 'Node',
  2: 'TS',
  length: 3
}
```

处理类数组对象一般都是转换为数组，有以下方式

* `Array.from(arrlike)`
* `[].conact.apply([], arrlike)`
* `[].slice.call(arrlike) Arr.prototype.slice.call(arrlike)`
* 自己转换方法，无非就是遍历
* 如果有迭代器，甚至可以`[...arrlike]`

#### 代码







### 思考
