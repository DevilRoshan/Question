# js-promise

### 题目

```
// 以下代码执行顺序
new Promise((resolve, reject) => {
  console.log('AAAA');
  resolve();
}).then(() => {
  new Promise((resolve, reject) => {
    console.log('BBBB');
    resolve();
  }).then(() => {
    console.log('CCCC');
  }).then(() => {
    new Promise((resolve, reject) => {
      console.log('DDDD');
      resolve();
    }).then(() => {
      console.log('EEEE');
    }).then(() => {
      console.log('FFFF');
    });
    console.log('GGGG');
  });
  console.log('HHHH');
}).then(() => {
  console.log('IIII');
})

new Promise((resolve, reject) => {
  console.log('JJJJ');
  resolve();
}).then(() => {
  console.log('KKKK');
}).then(() => {
  console.log('LLLL');
})
```



### 解题

#### 思路

* 主要是微任务promise的放入队列的顺序，按序执行，列出放入顺序就好
* new Promise和传入的函数，都是直接执行的同步代码

#### 代码

```javascript
new Promise((resolve, reject) => {
  console.log('AAAA');
  resolve();
}).then(() => { // taskB
  new Promise((resolve, reject) => {
    console.log('BBBB');
    resolve();
  }).then(() => { // taskC
    console.log('CCCC');
  }).then(() => { // taskD
    new Promise((resolve, reject) => {
      console.log('DDDD');
      resolve();
    }).then(() => { // taskE
      console.log('EEEE');
    }).then(() => { // taskF
      console.log('FFFF');
    });
    console.log('GGGG');
  });
  console.log('HHHH');
}).then(() => { // taskI
  console.log('IIII');
})

new Promise((resolve, reject) => {
  console.log('JJJJ');
  resolve();
}).then(() => { // taskK
  console.log('KKKK');
}).then(() => { // taskL
  console.log('LLLL');
})

// 每个then给微任务队列推入一个任务
// 执行同步代码，然后执行微任务 
// 1.输出 AAAA, 放入taskB, 输出 JJJJ, 放入taskK, 此时微任务队列[taskB, taskK]
// 2.执行taskB, 输出 BBBB，放入taskC, 输出 HHHH, 放入taskI, 此时微任务队列[taskK, taskC, taskI]
// 3.执行taskK, 输出 KKKK, 放入taskL, 此时微任务队列[taskC, taskI, taskL]
// 4.执行taskC, 输出 CCCC, 放入taskD, 此时微任务队列[taskI, taskL, taskD]
// 5.执行taskI, 输出 IIII, 此时微任务队列[taskL, taskD]
// 6.执行taskL, 输出 LLLL, 此时微任务队列[taskE]
// 7.执行taskD, 输出 DDDD, 放入taskE, 输出 GGGG, 此时微任务队列[taskL, taskE]
// 8.执行taskE, 输出 EEEE, 放入taskF, 此时微任务队列[taskF]
// 9.执行taskF, 输出 FFFF, 清空微任务，执行结束
// 所以输出顺序为: AAAA => JJJJ => BBBB => HHHH => KKKK => CCCC => IIII => LLLL => DDDD => GGGG => EEEE => FFFF
```



### 思考

* 主要是放入队列的顺序，细心罗列出就好了