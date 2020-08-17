# js-code-object

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var a1={}, b1='123', c1=123;
a1[b1]='b';
a1[c1]='c';
console.log(a1[b1]);
var a2={}, b2=Symbol('123'), c2=Symbol('123');
a2[b2]='b';
a2[c2]='c';
console.log(a2[b2]);
var a3={}, b3={key:'123'}, c3={key:'456'};
a3[b3]='b';
a3[c3]='c';
console.log(a3[b3]);
```



### 解题

#### 思路

* 对象的键名只能是字符串和`Symbol`类型
* 其他类型会转换为字符串类型，调用`toString()`方法

#### 代码

```javascript
// 以下代码输出
var a1={}, b1='123', c1=123;
a1[b1]='b';
a1[c1]='c';
// c1转换为字符串，覆盖b1的赋值
// 最终对象为 {123: "c"}
console.log(a1[b1]); // 'c'
var a2={}, b2=Symbol('123'), c2=Symbol('123');
a2[b2]='b';
a2[c2]='c';
// Symbol类型是唯一的，所以b2和c2是不相同的
// 最终对象为 {Symbol(123): "b", Symbol(123): "c"}
console.log(a2[b2]); // 'b'
var a3={}, b3={key:'123'}, c3={key:'456'};
a3[b3]='b';
a3[c3]='c';
// 对象转换为字符串为[object Object]，两者转换相同，c2覆盖b2
// 最终对象为 {[object Object]: "c"}
console.log(a3[b3]); // 'c'
```



### 思考

