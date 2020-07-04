# js-iterator

### 题目

iterator迭代器是什么？



### 解题

#### 思路

- 对于可迭代的数据结构，ES6在内部部署了一个[Symbol.iterator]属性，它是一个函数，执行后会返回iterator对象（也叫迭代器对象，也叫iterator接口）
- 拥有[Symbol.iterator]属性的对象即被视为可迭代的，可以使用for of
- 一般可迭代的对象都有获取迭代器的API，通过不同的方法迭代数据
- iterator对象有一个next方法，next方法执行后返回一个有value,done属性的对象
- 可迭代数据结构
  - Array
  - Map
  - Set
  - String
  - TypedArray（类数组）
  - 函数的 arguments 对象
  - NodeList 对象

#### 代码



### 思考

* 简单了解一下iterator，这个还有很多复杂的用法。