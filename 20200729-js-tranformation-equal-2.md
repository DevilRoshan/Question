# js-transformation-equal-2

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
const a = [1,2,3], b = [1,2,3], c = [1,2,4], d = "2", e = "11";
console.log([
  a == b,
  a === b,
  a > c,
  a < c,
  d > e
])
```



### 解题

#### 思路

* 引用类型只要不是同一个引用，就不相等
* 比较`>`和`<`的时候，回调用引用类型的`toString`方法，而字符串是通过`Unicode`码来比较的，从头开始按序比较，所以`"1,2,3" < "1,2,4"`且`"2">"11"`

#### 代码

```javascript
const a = [1,2,3], b = [1,2,3], c = [1,2,4], d = "2", e = "11";
console.log([
  a == b, // false
  a === b, // false
  a > c, // false
  a < c, // true
  d > e // true
])
```



### 思考
