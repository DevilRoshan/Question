# javaScript-execution-engine

> 参考链接：https://github.com/azl397985856/fe-interview/issues/35

### 题目

以下关于Javascript执行引擎描述正确的是

1. ECMAScript 2015中规定了执行引擎需要实现EventLoop机制。
2. V8作为最先进的Javascript执行引擎，可以在执行阶段对所有代码进行优化。
3. Node.js通过V8实现异步I/O。
4. Node.js的Buffer类型对象在创建时内存不会分配到V8堆上。
5. Chakra是Firefox内嵌的Javascript执行引擎。
6. 代码正确的情况下，垃圾回收不会导致有内存无法回收。



### 解题

#### 思路

* 第一，错误。 两者没有任何关系
* 第二，错误。执行阶段，V8会先生成字节码（快），再在运行过程中逐步将高频函数转化成优化后的机器码（慢）
* 第三，错误。 V8只是负责解析和运行JS代码。Node.js通过libuv抽象封装层不同平台使用不同方法实现异步I/O，windows是IOCP，*nix是自定义线程池
* 第四，正确。Node的Buffer模块性能相关部分有C++实现，所以Buffer对象的内存分配不是在V8的堆内存中，而是在Node的C++层面实现内存申请的（Buffer的内存虽然由Node的C/C++层面实现内存申请，但是变量的回收的还是由V8的GC管理的）
* 第五，错误。Chakra是IE的js引擎，Firefox的js引擎是SpiderMonkey。
* 第六，错误。这个其实取决于垃圾回收算法的

#### 代码



### 思考



### 扩展