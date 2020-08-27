# js-code-reduce

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
function showCase(value) {
  switch(value){
    case 'A':
      console.log('Case A');
      break;
    case 'B':
      console.log('Case B');
      break;
    case undefined:
      console.log('undefined');
      break;
    default:
      console.log('Do not know!');
  }
}
showCase(new String('A'))
```



### 解题

#### 思路

* new String 生成的是一个对象，而不是string类型，所以检测不到

#### 代码

```javascript
// 以下代码输出
function showCase(value) {
  switch(value){
    case 'A':
      console.log('Case A');
      break;
    case 'B':
      console.log('Case B');
      break;
    case undefined:
      console.log('undefined');
      break;
    default:
      console.log('Do not know!');
  }
}
showCase(new String('A')) // Do not know! 
```





### 思考

