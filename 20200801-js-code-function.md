# js-code-function

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
function func(n, o){
  console.log(o);
  return {
    func: function(m) {
      return func(m, n)
    }
  }
}

const a = func(0);a.func(1);a.func(2);a.func(3);
const b = func(0).func(1).func(2).func(3);
const c = func(0).func(1);c.func(2);c.func(3);
```



### 解题

#### 思路

* 函数执行，只要理清变量和闭包作用域就不会错

#### 代码

```javascript
// 以下代码输出
function func(n, o){
  console.log(o);
  return {
    func: function(m) {
      return func(m, n)
    }
  }
}

const a = func(0); // undefined
	a.func(1); // 0
	a.func(2); // 0
	a.func(3); // 0
const b = func(0) // undefined
	.func(1) // 0
	.func(2) // 1
	.func(3);// 2
const c = func(0) // undefined
	.func(1); // 0
	c.func(2); // 1
	c.func(3); // 1
```



### 思考

