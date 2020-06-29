# webpack-hot-update

> 参考链接：https://www.imooc.com/article/293578

### 题目

Webpack热更新实现原理



### 解题

#### 思路

- watch 编译过程、devServer 推送更新消息到浏览器
  - devServer接收到文件改变的消息的时候，会自动生成bundle文件
  - 将bundle文件缓存到内存中
  - 同时通过websocket发送更新的消息
- 浏览器接收到服务端消息做出响应
  - 根据接收到的消息进行处理，添加依赖或者删除依赖
- 对模块进行热更新或刷新页面

#### 代码



### 思考

* 简单的叙述是这样，之后有机会出一期热更新的源码剖析