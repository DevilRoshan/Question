# js-code-return

> 出自小程序前端面试星球

### 题目

```javascript
// 以下代码输出
function getName(){
  for(let i = 0; i < 5; i++){
    setTimeout(function(){
      console.log(i)
    }, i * 1000)
  }
  return
  {
    name: 'XXX'
  }
}
console.log(getName())
```



### 解题

#### 思路

* `setTimeout`的输出不用说，就是`let`声明变量，在`for`语句中形成了类似闭包的作用域，所以每次的变量是新的
* 第一个输出是`undifined`而不是`{name:'XXX'}`是因为换行导致return添加了分毫，导致变成了`return ;`，所以输出就成了`undefined`

#### 代码

```javascript
// 以下代码输出
function getName(){
  for(let i = 0; i < 5; i++){
    setTimeout(function(){
      console.log(i)
    }, i * 1000)
  }
  return
  {
    name: 'XXX'
  }
}
console.log(getName()) // undefined 0, 1, 2, 3, 4
```



### 思考

自动添加分号的情况：

* 下一行开始与本行结尾连在一起可以解释，不会添加分号，如果无法一起解释，则自动添加分号
* 下一行起始是`++/--`运算符时，自动添加
* 如果是`continue`，`break`，`return`，`throw`后面跟换行符，则添加分号