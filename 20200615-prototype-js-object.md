# prototype-js-object

### 题目

js内置对象构造函数的关系



### 解题

#### 思路

- 在js中每种变量都有其构造函数，都是其构造函数的实例化，所以每个构造函数的实例化产物的`__proto__`属性指向气构造函数的`prototype`，所以字符串加`.`语法可以调用`String.prototype`上的方法
- 所有的构造函数也就是函数，都是`Function`的实例化，所以所有的函数的`__proto__`指向`Function.prototype`，`Object构造函数和Function构造函数`也不例外
- 所有函数的`prototype`都是对象，对象都是`Object`的实例化，所以所有的对象的`__proto__`最后都指向`Object.prototype`；所有`prototype`的`__proto__`属性都指向`Object.prototype`
- 所有函数的`prototype`的`constructor`都指向函数本身

#### 代码



### 思考

* 牢记以上4点，判断内置对象就不会出错



### 扩展