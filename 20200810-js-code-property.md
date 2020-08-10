# js-code-property

> 出自小程序前端面试星球
>
> 参考链接：
>
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
>
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

### 题目

```javascript
// 以下代码输出
const person = {name: '张三'};
Object.defineProperty(person, 'address', {value: '北京'});
console.log(person);
console.log(Object.keys(person));
```



### 解题

#### 思路

* 使用`Object.defineProperty`添加的属性值是不可修改（**immutable**）的，不可枚举（**enumerable**）的。
* `Object.keys` 返回一个所有元素为字符串的数组，其元素来自于从给定的`object`上面可直接枚举的属性。

#### 代码

```javascript
// 以下代码输出
const person = {name: '张三'};
Object.defineProperty(person, 'address', {value: '北京'});
console.log(person); // {name: "张三", address: "北京"}
console.log(Object.keys(person)); // ["name"]
```



### 思考