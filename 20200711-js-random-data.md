# js-random-data

### 题目

js生成随机数和随机字符串



### 解题

#### 思路

- 随机的原理基本上是，使用`Math.random()`的相关操作来生成
- `parseInt(Math.random() * numAdd(numSub(*max*, *min*), 1, *min*), 10)`min到max之间的值
- `0 | Math.random() * 100// 最大范围数`，生成最大数为多少的随机数
- `new Date() % 100 //位数`，利用时间戳也可以生成，因为时间戳是唯一的，且每次计算的毫秒是没有办法控制的，等价于随机
- `Math.random().toString(36).slice(-8)`生成随机字符串

#### 代码





### 思考

