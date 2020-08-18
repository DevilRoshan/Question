# js-code-point

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
let a = {n:1};
let b = a;
a.x = a = {n:2};
console.log(a.x);
console.log(b.x);
```



### 解题

#### 思路

* 点优先级大于等号的优先级，所以赋值的语句那里是先取对象指针，再赋值，也就是执行过程的问题

#### 代码

```javascript
// 以下代码输出
let a = {n:1};
let b = a;
a.x = a = {n:2};
// 拆分为
// x = a.x (x 是旧对象的指针，指向旧对象的内存地址，是b指针指向地址的属性)
// a = {n:2} (新的对象)
// x = a
// 这里 x 指向的是最开始的对象的内存地址，所以，最后 x = {n:2} => b = {n:1, x: {n:2}}
// 而 a 是后来的一个新对象，所以 a = {n:2}
console.log(a.x); // undefined
console.log(b.x); // {n:2}
```



### 思考

