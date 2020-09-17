# js-error-catch

> 出自小程序前端面试星球

### 题目

项目中如何进行异常捕获



### 解题

#### 思路

* 代码中
  * `try catch`，捕捉代码执行的异常
  * `window.onerror`，捕捉预料之外的异常，无法捕捉资源404，其余报错都会捕捉到
  * `window.addEventListener('error', () => {}, true)`，可以监听到资源加载的错误，可以注册多个事件处理函数，无法判断http状态码
  * `window.addEventListener('unhandledrejection')`，全局捕捉未被捕捉的promise异常
* 框架中
  * Vue `errorHandler`，Vue官方的处理错误方法
  * React `componentDidCatch`，React官方的生命周期，用于捕捉错误
* 资源加载
  * `performance.getEntries()`，获取到所有加载的资源，以此判断
  * `onerror`，一般资源标签都会支持onerror事件，可以在onerror事件中执行回调

#### 代码







### 思考

