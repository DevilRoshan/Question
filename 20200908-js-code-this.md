# js-code-this

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
var fullname = 'X'
var obj = {
  fullname: 'XX',
  prop: {
    fullname: 'XXX',
    getFullName: function() {
  		return this.fullname
		},
    getFullNameArrow: () => {
      return this.fullname
    }
  }
};
console.log(obj.prop.getFullName())
console.log(obj.prop.getFullNameArrow())
var test = obj.prop.getFullName;
console.log(test())
var testArrow = obj.prop.getFullNameArrow;
console.log(testArrow())
```



### 解题

#### 思路

* 可以这样理解，`this`只与最近`function`声明的函数有关系[`class`本质是`fuction`声明的构造函数]，这个关系是调用关系，谁调用这个`this最近的function声明的函数`，这个`this`就指向谁
* 箭头函数中的`this`外没有`function`声明的函数，所以指向全局
* `getFullName`这个`function`声明的函数，最开始被`obj.prop`调用，后来被`window`调用，所以，this开始指向`obj.prop`后来指向`window`

#### 代码

```javascript
// 以下代码输出
var fullname = 'X'
var obj = {
  fullname: 'XX',
  prop: {
    fullname: 'XXX',
    getFullName: function() {
  		return this.fullname
		},
    getFullNameArrow: () => {
      return this.fullname
    }
  }
};
console.log(obj.prop.getFullName()) // "XXX"
console.log(obj.prop.getFullNameArrow()) // "X"
var test = obj.prop.getFullName;
console.log(test()) // "X"
var testArrow = obj.prop.getFullNameArrow;
console.log(testArrow()) // "X"
```



### 思考

