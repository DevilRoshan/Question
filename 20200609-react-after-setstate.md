# react-after-setstate

> 参考链接：https://zhuanlan.zhihu.com/p/65627731

### 题目

react setState之后做了什么



### 解题

#### 思路

* 将需要更新的state放在队列里，然后处理组件实例，将组件实例也放在更新队列中
* 更新队列，判断当前是否在创建和更新时，如果正在创建和更新时，则将组件实例放到dirtyComponent
* 更新阶段将所有的dirtyComponent更新，调用相关的生命周期组件

#### 代码



### 思考



### 扩展

* 先简单作答，之后出一次react源码解析，在仔细分析这部分