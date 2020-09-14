# js-code-promise

> 出自小程序前端面试星球

### 题目

`map`和`for`中调用异步函数的区别，即

```javascript
// map
[1, 2, 3].map(async v => {
  // do something
  await asyncFunc(v)
  // do something
})
// for
for(let i = 0; i < 3; i++){
	// do something
  await asyncFunc(i)
  // do something
}
```



### 解题

#### 思路

map是将数组中每一项传入函数，然后执行，他并不会等待异步执行完成再继续下一步，for是顺序执行代码，所以会一步步执行，这个时候会等一步

#### 代码

```javascript
// map
asyncFunc(1)
asyncFunc(2)
asyncFunc(3)

// for
await asyncFunc(0)
await asyncFunc(1)
await asyncFunc(2)
```





### 思考

