# js-code-scope

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
function test(){
  var a = 1;
  return function(){
    eval("")
  }
}
test()
```



### 解题

#### 思路

* 不会被回收，因为js不确定eval是否对a进行了引用，所以为了保险，不会对其进行优化
* trycatch，with也不会被回收，with会创建新的作用域

#### 代码





### 思考

