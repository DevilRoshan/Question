# js-event-loop

### 题目

以下代码输出顺序

```
console.log('AAAA');
setTimeout(() => console.log('BBBB'), 1000);
const start = new Date()
while(new Date() - start < 3000){}
console.log('CCCC');
setTimeout(() => console.log("DDDD"), 0);
new Promise((reslove, reject) => {
  console.log('EEEE');
  foo.bar(100);
})
.then(() => console.log("FFFF"))
.then(() => console.log("GGGG"))
.catch(() => console.log("HHHH"))
console.log("IIII")
```



### 解题

#### 思路

* 简单的代码执行问题，主要是事件循环和，promise异步编程
* 6，7的顺序是因为while执行了3s所以setTimeout的事件到了

#### 代码

```
console.log('AAAA'); // 1
setTimeout(() => console.log('BBBB'), 1000); // 6
const start = new Date()
while(new Date() - start < 3000){} // 暂停3s
console.log('CCCC'); // 2
setTimeout(() => console.log("DDDD"), 0); // 7
new Promise((reslove, reject) => {
  console.log('EEEE'); // 3
  foo.bar(100); // 执行方法报错
})
.then(() => console.log("FFFF")) // 因promise内部报错所以不执行
.then(() => console.log("GGGG")) // 因promise内部报错所以不执行6
.catch(() => console.log("HHHH")) // 5
console.log("IIII") // 4
```





### 思考
