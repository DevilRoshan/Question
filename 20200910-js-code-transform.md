# js-code-transform

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var arr = [0];
if(arr){
  console.log(arr == true)
} else {
  console.log(arr)
}
```



### 解题

#### 思路

* 判断语句会将数组转换为`Boolean`，也就是`Boolean([0]) == true`
* 等于语句转化是将两边转化为数字，如果有`boolean`则将其转化为数字，如果有对象，则调用`valueof()或者toString()`获取原始值，`[0] => [0].toString() = "0" => 0` 而`true => 1`，所以是`false`

#### 代码

```javascript
// 以下代码输出
var arr = [0];
if(arr){
  console.log(arr == true) // false
} else {
  console.log(arr) // 不会执行
}
```



### 思考

