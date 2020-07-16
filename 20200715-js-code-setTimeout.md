# js-code-setTimeout

### 题目

```
// 以下代码的结果
setTimeout(function(){
	console.log('BBBB')
}, 1000)
const start = new Date();
while(new Date() - start < 3000){}
console.log("CCCC")
setTimeout(function(){
	console.log('DDDD')
}, 0)
```





### 解题

#### 思路

* 首先执行函数内部内容
  * 这里的while循环和"CCCC"的输出就是函数内部的代码
* 然后执行宏任务
  * setTimeout内的代码会被放在宏任务中，按照条件执行

#### 代码

```
// "CCCC" "BBBB" "DDDD"
```





### 思考

