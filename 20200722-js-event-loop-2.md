# js-event-loop-2

### 题目

```javascript
// 以下代码执行顺序
new Promise((resolve, reject) => {
  console.log("A");
  setTimeout(() => {
    console.log("B");
  }, 0)
  console.log("C");
  resolve();
  console.log("D");
}).then(() => {
  console.log("E");
  new Promise((resolve, reject) => {
    console.log("F");
    resolve();
    console.log("G");
  }).then(() => {
    setTimeout(() => {
      console.log("H");
    }, 0)
    console.log("I");
  }).then(() => {
    console.log("J");
  })
}).then(() => {
  console.log("K")
})

setTimeout(() => {
  console.log("L")
})

new Promise((resolve, reject) => {
  console.log("M");
  resolve();
}).then(() => {
  setTimeout(() => {
    new Promise((resolve, reject) => {
      console.log("N");
      resolve();
    }).then(() => {
      setTimeout(() => {
        console.log("O");
      }, 0)
    }).then(() => {
      console.log("P");
    })
  })
})

console.log("Q")
```



### 解题

#### 思路

* 时间循环的升级版，思路还是按照执行顺序一次放入宏任务和微任务队列，按序执行

#### 代码

```javascript
// 以下代码执行顺序
new Promise((resolve, reject) => {
  console.log("A");
  setTimeout(() => { // taskB
    console.log("B"); 
  }, 0)
  console.log("C");
  resolve();
  console.log("D");
}).then(() => { // taskE
  console.log("E");
  new Promise((resolve, reject) => {
    console.log("F");
    resolve();
    console.log("G");
  }).then(() => { // taskH
    setTimeout(() => { // taskH1
      console.log("H");
    }, 0)
    console.log("I");
  }).then(() => { // taskJ
    console.log("J");
  })
}).then(() => { // taskK
  console.log("K")
})

setTimeout(() => { // taskL
  console.log("L")
})

new Promise((resolve, reject) => {
  console.log("M");
  resolve();
}).then(() => { // taskN
  setTimeout(() => { // taskN1
    new Promise((resolve, reject) => {
      console.log("N");
      resolve();
    }).then(() => { // taskO
      setTimeout(() => { // taskO1
        console.log("O");
      }, 0)
    }).then(() => { // taskP
      console.log("P");
    })
  })
})

console.log("Q")

// 执行同步代码，然后执行微任务，然后执行宏任务
// 每次执行完成之后，统计微任务和宏任务队列结果
// 1.执行同步代码
// 1.输出A, 放入taskB, 输出C, 输出D, 放入taskE, 放入taskL, 输出M, 放入taskN, 输出Q
// 宏任务:[taskB, taskL] 微任务:[taskE, taskN]
// 2.执行微任务
// 2.输出E, 输出F, 输出G, 放入taskH, 放入taskK, 放入taskN1
// 宏任务:[taskB, taskL, taskN1] 微任务:[taskH, taskK]
// 3.执行微任务
// 3.放入taskH1, 输出I, 放入taskJ, 输出K
// 宏任务:[taskB, taskL, taskN1, taskH1] 微任务:[taskJ]
// 4.执行微任务
// 4.输出J
// 宏任务:[taskB, taskL, taskN1, taskH1] 微任务:[]
// 5.执行宏任务taskB, taskL, taskN1
// 5.输出B, 输出L, 输出N, 放入taskO
// 宏任务:[taskH1] 微任务:[taskO]
// 6.执行微任务
// 6.放入taskO1, 放入taskP
// 宏任务:[taskH1, taskO1] 微任务:[taskP]
// 7.执行微任务
// 7.输出P
// 宏任务:[taskH1, taskO1] 微任务:[]
// 8.执行宏任务
// 8.输出H, 输出O
// 宏任务:[] 微任务:[]
// 执行结束

// 结果：A, C, D, M, Q, E, F, G, I, K, J, B, L, N, P, H, O
```



### 思考
