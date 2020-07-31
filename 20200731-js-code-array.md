# js-code-array

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var arr1 = "ab".split('');
var arr2 = arr1.reverse();
var arr3 = "abc".split('');
arr2.push(arr3);
console.log(arr1.length, arr2.length);
console.log(arr1.slice(-1), arr2.slice(-1));
console.log(arr1[0], arr2[0]);

console.log(arr1.splice(0, 0, 'c'), arr2.splice(0, 0, 'c'))
console.log(arr2.length);
console.log(arr2.slice(-1));
console.log(arr2[0]);
```



### 解题

#### 思路

* reverse方法反转数组，返回当前数组，所以`arr1 === arr2`
* splice方法会修改原数组，slice方法不会修改原数组

#### 代码

```javascript
// 以下代码输出
var arr1 = "ab".split('');
var arr2 = arr1.reverse();
var arr3 = "abc".split('');
arr2.push(arr3);
console.log(arr1 === arr2); // true
console.log(arr1.length, arr2.length); // 3 3
console.log(arr1.slice(-1), arr2.slice(-1));  // ["a", "b", "c"] ["a", "b", "c"]
console.log(arr1[0], arr2[0]); // "b"

console.log(arr1.splice(0, 0, 'c'), arr2.splice(0, 0, 'c')) // [] []
console.log(arr2.length); // 5
console.log(arr2.slice(-1)); // ["a", "b", "c"]
console.log(arr2[0]); // "c"
```



### 思考

