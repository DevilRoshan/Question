# js-react-pure

> 出自小程序前端面试星球

### 题目

React.Component和React.PureComponent的区别



### 解题

#### 思路

* 简单来说，两者的不同就是，在PureComponent中对props和state进行了浅对比，就是将他们与上一次的值进行浅对比，如果相同就不再更新
* 浅对比的意思就是`===`，这对基础类型是没问题的，但是对于引用类型就需要注意了，如果只是state或者props嵌套层级比较深，而你只是修改其中的一个属性，并没有修改这个对象的引用，那么这次修改将不会被更新
* Component可以通过shouldComponentUpdate来实现PureComponent的功能
* PureComponent可以简单的对比是否相同来避免重复渲染，但是要注意引用类型的情况

#### 代码







### 思考

