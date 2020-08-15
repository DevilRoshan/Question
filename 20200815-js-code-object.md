# js-code-object

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
function user(obj) {
  obj.name = "XXX"
  obj = new Object()
  obj.name = "xxx"
}
let person = new Object();
user(person);
console.log(person);
```



### 解题

#### 思路

* 最开始传入的引用，修改了`name`，而后`obj`重新赋值，就是新的对象了，不会对以前对象产生影响

#### 代码

```javascript
// 以下代码输出
function user(obj) {
  obj.name = "XXX"
  obj = new Object()
  obj.name = "xxx"
}
let person = new Object();
user(person);
console.log(person.name); // XXX
```



### 思考

