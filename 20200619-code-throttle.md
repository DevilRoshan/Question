# code-call-throttle

### 题目

实现节流函数(throttle)



### 解题

#### 思路

节流函数原理:规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

#### 代码

```
// 节流函数
const throttle = (fn, delay = 500) => {
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};
```



### 思考

- 拖拽：固定时间内只执行一次，防止超高频次触发位置变动
- 缩放：监控浏览器resize
- 动画：避免短时间内多次触发动画引起性能问题
- 游戏攻击间隔也是这个原理