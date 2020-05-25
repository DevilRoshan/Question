# number-zero-judge

> 参考链接：https://github.com/azl397985856/fe-interview/issues/11



### 题目

JavaScript的数值Number用64位的浮点数表示，首位是符号位，然后是52位的整数位和11位的小数位。如果符号位为1，其他各位均为0，那么这个数值会被表示成“-0”。

所以JavaScript的“0”值有两个，+0和-0。

那么如何区分呢？



### 解题

#### 思路

* 死记硬背

#### 代码

```
var a = +0;
console.log(1/a === Infinity)

var b = -0;
console.log(1/b === -Infinity)
```



### 思考

* 个人以为是符号位的判断，所以，1/0之后的无穷是有符号的，即符号位不变，待确认
* 目前记住吧