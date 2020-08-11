# js-code-parseInt

> 出自小程序前端面试星球
>

### 题目

```javascript
// 以下代码输出
const num = parseInt("2*4", 10);
console.log(num)
```



### 解题

#### 思路

* `parseInt`解析数字，检查字符串中字符是否合法，遇到第一个不合法的字符就停止解析，所以解析出了`2`
* 再使用十进制解析，返回最后结果

#### 代码

```javascript
// 以下代码输出
const num = parseInt("2*4", 10);
console.log(num) // 2
```



### 思考

