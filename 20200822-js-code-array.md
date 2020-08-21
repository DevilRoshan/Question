# js-code-array

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
const obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```



### 解题

#### 思路

* push方法可以作用在类数组对象中，会根据length属性决定从哪里开始插入，如果length，或者length不存在都会从0处开始，并且创建length
* 有splice方法代表这个对象为类数组对象
* 所以这个数据调用push方法，会从2开始插入，所以覆盖下标2和3的值，输出为一个类数组对象

#### 代码

```javascript
const obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj) // Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
```



### 思考

