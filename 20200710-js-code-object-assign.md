# js-code-object-assign

### 题目

实现`object.assign`



### 解题

#### 思路

- Object.assign是浅拷贝,对于值是引用类型的属性拷贝扔的是它的引用
- `Object.assign` 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。
- target必须是一个对象,如果传入一个基本类型,会变成基本包装类型,null/undefined没有基本包装类型,所以传入会报错
- source参数如果是不可枚举的会忽略合并(字符串类型被认为是可枚举的,因为内部有iterator接口)
- 该方法使用源对象的`[[Get]]`和目标对象的`[[Set]]`，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用[`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)和[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 。
- [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)类型和 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 类型的属性都会被拷贝。

#### 代码

```
function assign(target, ...sourceList) { // .length of function is 2
  'use strict';
  if (target === null || target === undefined) { // 限制target元素
  	throw new TypeError('Cannot convert undefined or null to object');
  }
  var to = Object(target);
  sourceList.forEach(source => {
    // 限制source参数
    if (source !== null && source !== undefined) {
      // key和symbol
      [...Object.keys(source), ...Object.getOwnPropertySymbols(source)].forEach(key => {
      	to[nextKey] = nextSource[nextKey];
      })
    }
  })
  return to;
}
```



### 思考

* 容易忽略symbol
* 如果复制的对像有类似的修改getter和setter的操作，谨慎调用assign

