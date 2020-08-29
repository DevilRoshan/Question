# js-code-typeof-instanceof

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
[typeof null, null instanceof Object]
```



### 解题

#### 思路

* typeof null  =  "object" (因为一些以前的原因而不是'null')，这并不代表null就是对象
* null instanceof Object，null是基础类型，不是某个对象，所以没有构造函数，所以为false

#### 代码

```javascript
// 以下代码输出
[typeof null, null instanceof Object] //  ["object", false]
```





### 思考

* typeof 返回一个表示类型的字符串，typeof结果列表
  * undefined "undefined"
  * null "object"
  * true/false "boolean"
  * 1 "number"
  * ''  "string"
  * function(){}  "function"
  * symbol(' ') "symbol"
  * {} "object"
* instanceof 检测前面参数的constructor.prototype是否存在与后面参数上
  * ' ' instanceof Object // false
  * new String(' ') instanceof Object // true