# code-call-apply

### 题目

实现call和apply



### 解题

#### 思路

call和apply做了什么

* 将函数设为对象的属性
* 执行函数，执行完成之后删除这个函数
* 指定this到函数并传入给定参数执行函数
* 如果不传入参数，默认指向为 window

#### 代码

```
Function.prototype.myapply = function(context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = context.fn(...args)
  }

  delete context.fn;
  return result;
};
```



### 思考

* call和apply就是将函数放在某个对象上调用，以此来指定this



### 扩展