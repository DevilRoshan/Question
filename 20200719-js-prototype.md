# js-prototype

> 出自小程序前端面试星球

### 题目

```
// 写出以下代码的执行结果
Object.prototype.fengtai = '丰台'
var a = 123;
a.b = 456;
console.log(a.fengtai)
console.log(a.b)
```



### 解题

#### 思路

* 在a创建以前Object的原型上已经有了`fengtai`这个属性
* 访问a属性的时候会临时创建一个对象，这个对象就是其构造函数生成的实例，这道题中就是`Number`，因为所有的原型都是`Object`的实例，所以，a上就有`fengtai`这个属性
* 但是给a进行复制点语法赋值的时候，因为a是基本类型，所以并没有赋值成功

#### 代码

```
Object.prototype.fengtai = '丰台'
var a = 123;
a.b = 456;
console.log(a.fengtai) // 丰台
console.log(a.b) // undefined
```





### 思考

