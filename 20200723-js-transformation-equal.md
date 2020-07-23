# js-transformation-equal

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
let a = [];
let b = "0";
console.log(a == 0);
console.log(a == !a);
console.log(b == 0);
console.log(a == b);
```



### 解题

#### 思路

* 主要是考察等号的转换规则，总结下来一个结论，不要使用`==`

#### 代码

```javascript
let a = [];
let b = "0";
// a = []  => [].valueOf().toString() => ""
// !a = ![] => false
// b = "0" == 0 == false
console.log(a == 0); // "" == 0 => true 
console.log(a == !a); // "" == false => true
console.log(b == 0); // "0" == 0 => true
console.log(a == b); // "" != "0" => false
```



### 思考

* 引用类型一般会调用`valueOf().toString()`来转换
* https://github.com/DevilRoshan/Question/blob/master/20200526-a1true-a2true-a3true.md