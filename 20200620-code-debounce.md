# code-call-debounce

### 题目

实现防抖函数(debounce)



### 解题

#### 思路

防抖函数原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

#### 代码

```
// 防抖函数
const throttle = (fn, delay = 500) => {
  let timer = null
  return (...args) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
```



### 思考

- API调用：避免重复请求

