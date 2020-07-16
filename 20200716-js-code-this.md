# js-code-this

### 题目

以下代码执行结果

```
var a = 10;
var obj = {
  a: 100,
  pro: {
    getPro: () => {
      console.log(this.a);
    }
  }
}
obj.pro.getPro()

var a = {n : 1};
var b = a;
a.x = a = {n: 2};
console.log(a.x);
console.log(b.x);
```



### 解题

#### 思路

* 第一个
  * 输出箭头函数的this继承自上一个作用域，就是window所以输出10
  * 即使不使用箭头函数，也不会输出100，因为不使用箭头函数，它的this也是指向pro，输出的是`undefined`
* 第二个
  * 先执行`.`语法，所以赋值语句，先将`a.x`取出，然后第二步对a这个变量赋值，第三部对`a.x`进行赋值，因为`b.x === a.x`所以`b.x`赋值为`{n:2}`，而`a.x`为`undefined`

#### 代码

```
var a = 10;
var obj = {
  a: 100,
  pro: {
    getPro: () => {
      console.log(this.a); // 10
    }
  },
  pro2: {
    getPro: function() {
      console.log(this.a); // undefined
    }
  },
  pro3: {
  	a: 1000,
    getPro: function() {
      console.log(this.a); // 1000
    }
  }
}
obj.pro.getPro()
obj.pro2.getPro()
obj.pro3.getPro()

var a = {n : 1};
var b = a;
a.x = a = {n: 2};
console.log(a.x); // { n : 2 }
console.log(b.x); // undefined
```





### 思考

* 箭头函数的this指向父级作用域
* 点语法优先于其他语法