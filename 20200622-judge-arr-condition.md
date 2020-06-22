# judge-arr-condition

### 题目

如何准确判断一个对象是数组



### 解题

#### 思路

- 数组可以调用数组的方法
- 数组的构造函数有提供API判断
- 实例的`__propto__`指向构造函数的`prototype`
- instanceof 也是通过原型链判断
- 数组通过对象的`toString()`方法判断

#### 代码

```
Object.prototype.toString.call([])  // [object Array]
[].slice() // 报错就说明不是数组
[] instanceof Array // true
[].__proto__ === Array.prototype // true
Array.isArray([]) // true 存在兼容问题

```



### 思考
