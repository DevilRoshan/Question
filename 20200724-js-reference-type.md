# js-reference-type

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
const arr1 = ['a', 'b', 'c'];
const arr2 = ['b', 'c', 'a'];

console.log(
  arr1.sort() === arr1,
  arr2.sort() === arr2,
  arr1.sort() === arr2.sort(),
)
```



### 解题

#### 思路

* sort排序返回的是原始数组的引用，所以sort返回值跟以前的对象相等
* 而数组是引用类型，虽然两个数组的排序结果相同，但是在内存中存储的地址不同，依然是两个数组，所以不会相等

#### 代码

```javascript
// 以下代码输出
const arr1 = ['a', 'b', 'c'];
const arr2 = ['b', 'c', 'a'];

console.log(
  arr1.sort() === arr1, // true
  arr2.sort() === arr2, // true
  arr1.sort() === arr2.sort(), // false
)
```



### 思考
