# js-code-refer

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
function side(arr) {
  arr[0] = arr[2]
}
function func(a, b, c = 3){
  c = 10;
  side(arguments);
  return a + b + c
}
func(1, 1, 1)
```



### 解题

#### 思路

* `a, b, c`的值是基础类型，在函数调用的时候就已经声明了，就与`arguments`里面无关了，所以，无论参数里面的顺序如何改变，他们都是固定的，所以结果是`12`
* 而如果是引用类型就会改变，说明声明的只是一个引用

#### 代码

```javascript
// 以下代码输出
function side(arr) {
  arr[0] = arr[2]
}
function func(a, b, c = 3){
  c = 10;
  side(arguments);
  return a + b + c
}
func(1, 1, 1) // 12

function side(arr) {
  arr[0].value = 5
}
function func(a, b, c = 3){
  c = 10;
  side(arguments);
  return a.value + b + c
}

func({value: 3}, 1, 5) // 16
```



### 思考

