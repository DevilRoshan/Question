# js-capture-bubble

### 题目

我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？



### 解题

#### 思路

- 按照W3C的标准，先发生捕获事件，后发生冒泡事件。所有事件的顺序是：其他元素捕获阶段事件 -> 本元素代码顺序事件 -> 其他元素冒泡阶段事件

#### 代码

```
// div-capture > btn-bubble > btn-capture > div-bubble
var btn = document.querySelector('button');
var div = document.querySelector('div');

btn.addEventListener('click', function(){
    console.log('bubble','btn');
},false);
btn.addEventListener('click', function(){
    console.log('capture','btn');
},true);

div.addEventListener('click', function(){
    console.log('bubble','div');
},false);
div.addEventListener('click', function(){
    console.log('capture','div');
},true);
```



### 思考

